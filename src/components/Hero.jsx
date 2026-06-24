import { useState, useEffect } from 'react';
import heroImg from '../assets/hero-student.png';
import DotField from './DotField';
import './Hero.css';

const PHRASES = [
  "Expert 1-to-1 Tuition.",
  "Personalised Learning.",
  "Interactive Sessions.",
  "Proven Methodologies."
];

export default function Hero() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        
        if (text === currentPhrase) {
          // Wait longer when the phrase is fully typed out
          setTimeout(() => setIsDeleting(true), 1500); 
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        
        if (text === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <section className="hero" id="home">
      <DotField 
        gradientFrom="rgba(255, 255, 255, 0.9)"
        gradientTo="rgba(212, 168, 67, 0.8)"
        glowColor="rgba(212, 168, 67, 0.3)"
        dotRadius={2.5}
      />
      <div className="math-symbols">
        <span className="math-symbol">π</span>
        <span className="math-symbol">Σ</span>
        <span className="math-symbol">∫</span>
        <span className="math-symbol">√</span>
        <span className="math-symbol">∞</span>
        <span className="math-symbol">Δ</span>
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Enrolling Now for 2025–2026
          </div>

          <h1 className="hero-title">
            Master Mathematics through <br />
            <span className="typewriter-wrapper">
              <span className="typewriter-placeholder" aria-hidden="true">
                {PHRASES.map((phrase, i) => (
                  <span key={i} className="placeholder-text">{phrase}</span>
                ))}
              </span>
              <span className="highlight typewriter-text">
                {text}
                <span className="typewriter-cursor"></span>
              </span>
            </span>
          </h1>

          <p className="hero-subtitle">
            Focused 45-minute sessions aligned with British & European
            curriculum standards. Personalised learning that builds
            confidence and real understanding.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Start Free Trial
            </a>
            <a href="#syllabus" className="btn btn-outline">
              Explore Curriculum
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">500+</div>
              <div className="hero-stat-label">Students Tutored</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">98%</div>
              <div className="hero-stat-label">Pass Rate</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">4.9★</div>
              <div className="hero-stat-label">Parent Rating</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src={heroImg}
              alt="Student engaged in an online mathematics tutoring session"
              className="hero-image"
              width="520"
              height="520"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
