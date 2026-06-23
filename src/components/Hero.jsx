import heroImg from '../assets/hero-student.png';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Floating math symbols */}
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
            Master Mathematics with{' '}
            <span className="highlight">Expert 1-to-1</span>{' '}
            Live Tuition
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
