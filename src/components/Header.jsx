import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Curriculum', href: '/curriculum' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${(scrolled || !isHomePage) ? 'scrolled' : ''}`} id="header">
      <div className="header-inner">
        <Link to="/" className="logo" aria-label="IQRA Virtual Academy Home">
          <div className="logo-icon">إ</div>
          <div className="logo-text">
            IQRA <span>Virtual Academy</span>
          </div>
        </Link>

        <nav className="nav">
          <div className="nav-links">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link to="/contact" className="btn btn-primary header-cta">
            Book Free Trial
          </Link>
        </nav>

        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="nav-link"
            onClick={handleNavClick}
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/contact"
          className="btn btn-primary header-cta"
          onClick={handleNavClick}
        >
          Book Free Trial
        </Link>
      </div>
    </header>
  );
}
