import { Mail, Phone, MapPin, Globe, MessageCircle, Video } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
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
              <a href="#home" className="footer-link">Home</a>
              <a href="#benefits" className="footer-link">About Us</a>
              <a href="#syllabus" className="footer-link">Curriculum</a>
              <a href="#pricing" className="footer-link">Pricing</a>
              <a href="#contact" className="footer-link">Book a Trial</a>
            </div>
          </div>

          {/* Programmes */}
          <div className="footer-column">
            <h4>Programmes</h4>
            <div className="footer-links">
              <a href="#syllabus" className="footer-link">KS1 & KS2 Maths</a>
              <a href="#syllabus" className="footer-link">KS3 Maths</a>
              <a href="#syllabus" className="footer-link">GCSE Maths</a>
              <a href="#syllabus" className="footer-link">IGCSE Maths</a>
              <a href="#syllabus" className="footer-link">Exam Preparation</a>
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
    </footer>
  );
}
