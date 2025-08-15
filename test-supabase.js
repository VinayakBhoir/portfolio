// test-supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        // Test connection by getting table info
        const { data, error } = await supabase
            .from('visitors')
            .select('count', { count: 'exact', head: true });

        if (error) {
            console.error('Error:', error);
        } else {
            console.log('✅ Supabase connection successful!');
            console.log('Current visitor count:', data);
        }
    } catch (err) {
        console.error('❌ Connection failed:', err);
    }
}

testConnection();
