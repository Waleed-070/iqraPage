import { Mail, Phone, MapPin, Globe, MessageCircle, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const bubbles = useMemo(() => {
    return Array.from({ length: 128 }).map((_, i) => ({
      id: i,
      size: `${2 + Math.random() * 4}rem`,
      distance: `${6 + Math.random() * 4}rem`,
      position: `${2 + Math.random() * 96}%`,
      time: `${2 + Math.random() * 2}s`,
      delay: `${-1 * (2 + Math.random() * 2)}s`,
    }));
  }, []);

  return (
    <footer className="footer" id="footer">
      <div className="bubbles">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              '--size': bubble.size,
              '--distance': bubble.distance,
              '--position': bubble.position,
              '--time': bubble.time,
              '--delay': bubble.delay,
            }}
          />
        ))}
      </div>
      <div className="footer-bg" />
      <div className="footer-inner">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-about">
            <div className="logo">
              <div className="logo-icon">إ</div>
              <div className="logo-text">
                IQRA <span>Virtual Academy</span>
              </div>
            </div>
            <p>
              Empowering students across the UK and Europe with expert 1-to-1
              online mathematics tuition. Building confidence, one lesson at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/curriculum" className="footer-link">Curriculum</Link>
              <Link to="/pricing" className="footer-link">Pricing</Link>
              <Link to="/faq" className="footer-link">FAQ</Link>
              <Link to="/contact" className="footer-link">Book a Trial</Link>
            </div>
          </div>

          {/* Programmes */}
          <div className="footer-column">
            <h4>Programmes</h4>
            <div className="footer-links">
              <Link to="/curriculum" className="footer-link">KS1 & KS2 Maths</Link>
              <Link to="/curriculum" className="footer-link">KS3 Maths</Link>
              <Link to="/curriculum" className="footer-link">GCSE Maths</Link>
              <Link to="/curriculum" className="footer-link">IGCSE Maths</Link>
              <Link to="/curriculum" className="footer-link">Exam Preparation</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <Mail size={16} />
              info@iqravirtualacademy.com
            </div>
            <div className="footer-contact-item">
              <Phone size={16} />
              +44 (0) 123 456 7890
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} />
              UK & Europe (Online)
            </div>
            <div className="footer-social">
              <a
                href="#"
                className="footer-social-link"
                aria-label="Facebook"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                className="footer-social-link"
                aria-label="YouTube"
              >
                <Video size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} IQRA Virtual Academy. All rights reserved.
          </div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
      <svg style={{ position: 'fixed', top: '100vh' }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob" />
          </filter>
        </defs>
      </svg>
    </footer>
  );
}
