import { Award } from 'lucide-react';
import { AnimateOnScroll } from './ScrollAnimations';
import tutor1 from '../assets/tutor_1.png';
import tutor2 from '../assets/tutor_2.png';
import tutor3 from '../assets/tutor_3.png';
import './Tutors.css';

const TUTORS = [
  {
    img: tutor1,
    name: 'Ms. Sarah Jenkins',
    specialization: 'Primary & KS3 Expert',
    tag: 'Certified Teacher',
    hours: '800+ Hours Taught',
    bio: 'Passionate about building early mathematical confidence in young learners using hands-on, visual teaching methods.',
  },
  {
    img: tutor2,
    name: 'Mr. David Chen',
    specialization: 'GCSE & IGCSE Specialist',
    tag: 'Cambridge Trained',
    hours: '1,200+ Hours Taught',
    bio: 'Former Cambridge exam marker with deep expertise in exam strategy, past paper technique, and grade 7–9 achievement.',
  },
  {
    img: tutor3,
    name: 'Mr. Omar Farooq',
    specialization: 'Secondary & Algebra',
    tag: 'MSc Mathematics',
    hours: '600+ Hours Taught',
    bio: 'Specialist in making abstract algebra and geometry intuitive, with a proven track record of turning struggling students into top performers.',
  },
];

export default function Tutors() {
  return (
    <section className="tutors" id="tutors">
      <div className="section">
        <AnimateOnScroll>
          <div className="section-header">
            <h2>Meet Our Expert Tutors</h2>
            <p>
              Real, qualified educators — not algorithms. Every tutor is carefully vetted, trained, and matched to your child's unique needs.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="tutors-grid">
          {TUTORS.map((tutor, index) => (
            <AnimateOnScroll key={tutor.name} staggerIndex={index + 1}>
              <div className="tutor-card">
                <div className="tutor-img-wrap">
                  <img src={tutor.img} alt={tutor.name} />
                  <div className="tutor-badge">
                    <Award size={14} />
                    {tutor.tag}
                  </div>
                </div>
                <div className="tutor-body">
                  <h3 className="tutor-name">{tutor.name}</h3>
                  <p className="tutor-spec">{tutor.specialization}</p>
                  <p className="tutor-hours">{tutor.hours}</p>
                  <p className="tutor-bio">{tutor.bio}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
