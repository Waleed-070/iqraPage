import { Star } from 'lucide-react';
import { AnimateOnScroll } from './ScrollAnimations';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: 'Fatima A.',
    role: 'Parent of GCSE Student',
    location: 'London, UK',
    quote:
      'My daughter went from a Grade 4 to a Grade 8 in just three months. The tutor identified exactly where she was struggling and rebuilt her confidence from the ground up. Absolutely incredible.',
    stars: 5,
  },
  {
    name: 'James T.',
    role: 'Parent of Year 7 Student',
    location: 'Manchester, UK',
    quote:
      'We tried two other tutoring services before IQRA. The difference is night and day. The sessions are structured, the tutor is patient, and my son actually looks forward to his lessons now.',
    stars: 5,
  },
  {
    name: 'Aisha M.',
    role: 'GCSE Student',
    location: 'Birmingham, UK',
    quote:
      'I used to dread maths. Now I genuinely enjoy problem-solving. My tutor explains everything so clearly and never makes me feel bad for asking the same question twice.',
    stars: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="section">
        <AnimateOnScroll>
          <div className="section-header">
            <h2>Families Trust IQRA Virtual Academy</h2>
            <p>
              Real results from real students across the UK — hear what parents and learners have to say about their experience.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, index) => (
            <AnimateOnScroll key={t.name} staggerIndex={index + 1}>
              <div className="testimonial-card">
                <StarRating count={t.stars} />
                <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role} · {t.location}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
