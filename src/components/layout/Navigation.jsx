import { useState, useEffect } from 'react';
import { navigationItems } from '../../utils/constants';

const Navigation = ({ mobile = false, onItemClick }) => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = navigationItems.map(item => item.id);
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (e, href, id) => {
        e.preventDefault();

        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }

        if (onItemClick) onItemClick();
    };

    const baseClasses = mobile
        ? "block w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
        : "px-4 py-2 rounded-lg transition-all duration-200";

    const activeClasses = "text-[var(--accent-primary)] bg-[var(--accent-soft)]";
    const inactiveClasses = "text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-soft)]";

    return (
        <nav className={mobile ? "space-y-2" : "flex space-x-2"}>
            {navigationItems.map((item) => (
                <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href, item.id)}
                    className={`${baseClasses} ${activeSection === item.id ? activeClasses : inactiveClasses
                        }`}
                >
                    {item.label}
                </a>
            ))}
        </nav>
    );
};

export default Navigation;
