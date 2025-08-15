import { useEffect } from 'react';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

export const useKonamiCode = (callback) => {
    useEffect(() => {
        let sequence = [];
        let timeout;

        const handleKeyDown = (event) => {
            // Clear timeout on any key press
            clearTimeout(timeout);

            // Add key to sequence
            sequence.push(event.code);

            // Keep only the last 10 keys
            if (sequence.length > KONAMI_CODE.length) {
                sequence = sequence.slice(-KONAMI_CODE.length);
            }

            // Check if sequence matches Konami code
            if (sequence.length === KONAMI_CODE.length) {
                const matches = KONAMI_CODE.every((key, index) => key === sequence[index]);
                if (matches) {
                    callback();
                    sequence = []; // Reset sequence
                }
            }

            // Reset sequence after 3 seconds of inactivity
            timeout = setTimeout(() => {
                sequence = [];
            }, 3000);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timeout);
        };
    }, [callback]);
};
