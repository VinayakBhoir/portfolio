import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Rate limiting map (in-memory for demo, use Redis in production)
const rateLimitMap = new Map();

export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Enhanced IP detection
        const clientIP =
            req.headers['cf-connecting-ip'] ||          // Cloudflare
            req.headers['x-real-ip'] ||                 // Nginx
            req.headers['x-forwarded-for']?.split(',')[0] || // Load balancer
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            'unknown';

        // Rate limiting (prevent spam)
        const now = Date.now();
        const rateLimitKey = `${clientIP}_${Math.floor(now / 60000)}`; // 1 minute window

        if (rateLimitMap.has(rateLimitKey)) {
            const attempts = rateLimitMap.get(rateLimitKey);
            if (attempts >= 10) { // Max 10 requests per minute
                return res.status(429).json({
                    error: 'Rate limit exceeded',
                    count: 0,
                    country: 'Unknown',
                    countryCode: 'XX',
                    isNewVisitor: false
                });
            }
            rateLimitMap.set(rateLimitKey, attempts + 1);
        } else {
            rateLimitMap.set(rateLimitKey, 1);
        }

        // Clean up old rate limit entries
        if (Math.random() < 0.1) { // 10% chance to cleanup
            for (const [key] of rateLimitMap) {
                const keyTime = parseInt(key.split('_')[1]);
                if (now - keyTime > 120000) { // Remove entries older than 2 minutes
                    rateLimitMap.delete(key);
                }
            }
        }

        // Enhanced geolocation data (FIXED: Correct mapping)
        const countryCode = req.headers['x-vercel-ip-country'] || 'XX';  // 🔄 ISO-2 country code (e.g., 'US')
        const region = req.headers['x-vercel-ip-country-region'] || '';  // 🔄 Region/state (e.g., 'CA')
        const country = req.headers['x-vercel-ip-country'] ? req.headers['x-vercel-ip-country'] : 'Unknown';  // 🔄 Full country name if available
        const city = req.headers['x-vercel-ip-city'] || '';

        // Enhanced privacy hashing
        const userAgent = req.headers['user-agent'] || '';
        const combinedString = `${clientIP}:${userAgent.substring(0, 100)}`; // Limit user-agent length
        const hashedIP = crypto.createHash('sha256').update(combinedString).digest('hex');
        const userAgentHash = crypto.createHash('sha256').update(userAgent).digest('hex');

        // Check for existing visitor
        const { data: existingVisitor, error: selectError } = await supabase
            .from('visitors')
            .select('id, visit_count, first_visit, last_visit')
            .eq('hashed_ip', hashedIP)
            .single();

        let isNewVisitor = false;
        let isReturningToday = false;
        let daysSinceLastVisit = 0;
        let effectiveVisitCount = 1;

        if (!existingVisitor && selectError?.code === 'PGRST116') {
            // New visitor - insert record
            const { error: insertError } = await supabase
                .from('visitors')
                .insert({
                    hashed_ip: hashedIP,
                    country: country.substring(0, 100), // Limit length
                    country_code: countryCode.substring(0, 2),
                    region: region.substring(0, 100),
                    city: city.substring(0, 100),
                    user_agent_hash: userAgentHash,
                    visit_count: 1
                });

            if (insertError) {
                console.error('Insert error:', insertError);
            } else {
                isNewVisitor = true;
                effectiveVisitCount = 1;
            }
        } else if (existingVisitor) {
            // Returning visitor - update visit count and last visit
            const lastVisit = new Date(existingVisitor.last_visit);
            const today = new Date();
            const diffTime = Math.abs(today - lastVisit);
            daysSinceLastVisit = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            isReturningToday = daysSinceLastVisit === 0;

            effectiveVisitCount = (existingVisitor.visit_count || 0) + 1;

            // Update visit record
            const { error: updateError } = await supabase
                .from('visitors')
                .update({
                    visit_count: effectiveVisitCount,
                    last_visit: new Date().toISOString(),
                    country: country.substring(0, 100), // Update country in case it changed
                    country_code: countryCode.substring(0, 2)
                })
                .eq('hashed_ip', hashedIP);

            if (updateError) {
                console.error('Update error:', updateError);
            }
        }

        // Get total visitor count
        const { count, error: countError } = await supabase
            .from('visitors')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('Count error:', countError);
            return res.status(500).json({
                error: 'Failed to fetch visitor count',
                count: 0,
                country: 'Unknown',
                countryCode: 'XX',
                isNewVisitor: false
            });
        }

        // Get today's visitor count
        const today = new Date().toISOString().split('T')[0];
        const { count: todayCount } = await supabase
            .from('visitors')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', `${today}T00:00:00.000Z`)
            .lt('created_at', `${today}T23:59:59.999Z`);

        // Get country statistics
        const { data: countryStats } = await supabase
            .from('visitors')
            .select('country_code, country')
            .eq('country_code', countryCode)
            .limit(1);

        res.status(200).json({
            count: count || 0,
            todayCount: todayCount || 0,
            country,
            countryCode,
            region,
            city,
            isNewVisitor,
            isReturningToday,
            daysSinceLastVisit,
            visitCount: effectiveVisitCount,  // 🔄 Send the correct incremented value
            success: true,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Visitor count error:', error);
        res.status(500).json({
            error: 'Internal server error',
            count: 0,
            todayCount: 0,
            country: 'Unknown',
            countryCode: 'XX',
            isNewVisitor: false,
            success: false
        });
    }
}
