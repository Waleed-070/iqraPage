import { Users, BookOpen, RefreshCw, GraduationCap, UserCheck, TrendingUp } from 'lucide-react';
import { AnimateOnScroll } from './ScrollAnimations';
import './Benefits.css';

const BENEFITS = [
  {
    icon: Users,
    title: 'Live 1-to-1 Sessions',
    description: 'Dedicated individual attention in every 45-minute live session, ensuring personalised learning at your child\'s pace.',
  },
  {
    icon: BookOpen,
    title: 'Homework Support',
    description: 'Expert guidance on school homework and assignments, reinforcing classroom learning with hands-on practice.',
  },
  {
    icon: RefreshCw,
    title: 'Structured Revisions',
    description: 'Systematic revision plans designed to solidify understanding and prepare students for exams with confidence.',
  },
  {
    icon: GraduationCap,
    title: 'British Curriculum',
    description: 'Fully aligned with British National Curriculum, GCSE, IGCSE, and European mathematics standards.',
  },
  {
    icon: UserCheck,
    title: 'Qualified Teachers',
    description: 'Experienced, vetted tutors with proven track records in mathematics education and student success.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Regular progress reports and parent updates to keep you informed of your child\'s mathematical journey.',
  },
];

export default function Benefits() {
  return (
    <section className="benefits" id="benefits">
      <div className="section">
        <AnimateOnScroll>
          <div className="section-header">
            <h2>Why Choose IQRA Virtual Academy?</h2>
            <p>
              We combine expert tutoring with personalised attention to help
              every student unlock their mathematical potential.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="benefits-grid">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <AnimateOnScroll key={benefit.title} staggerIndex={index + 1}>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <Icon size={28} strokeWidth={1.8} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
