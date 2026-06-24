import { BookOpen, Calculator, GraduationCap } from 'lucide-react';
import { AnimateOnScroll } from './ScrollAnimations';
import './Programs.css';

const PROGRAMS = [
  {
    icon: BookOpen,
    stage: 'Key Stage 1 & 2',
    label: 'Primary',
    ages: 'Ages 5 – 11',
    color: 'prog-green',
    title: 'Building Confident Foundations',
    description:
      'Nurturing early love for numbers through logical puzzles, counting, basic arithmetic, and fundamental concepts that give young learners the confidence to excel.',
    topics: ['Number & Place Value', 'Addition & Subtraction', 'Shapes & Measurement', 'Logical Puzzles'],
  },
  {
    icon: Calculator,
    stage: 'Key Stage 3',
    label: 'Secondary',
    ages: 'Ages 11 – 14',
    color: 'prog-blue',
    title: 'Unlocking Algebraic Thinking',
    description:
      'Bridging the gap between primary and GCSE by developing strong algebraic reasoning, geometric understanding, and advanced problem-solving skills.',
    topics: ['Algebra & Equations', 'Geometry & Angles', 'Statistics & Probability', 'Ratio & Proportion'],
  },
  {
    icon: GraduationCap,
    stage: 'GCSE & IGCSE',
    label: 'Exam Prep',
    ages: 'Ages 14 – 16',
    color: 'prog-gold',
    title: 'Focused Exam Mastery',
    description:
      'Rigorous, exam-targeted sessions with full past paper practice, mark scheme analysis, and targeted revision to secure top grades in GCSE and IGCSE.',
    topics: ['Past Paper Practice', 'Mark Scheme Mastery', 'Exam Technique', 'Grade 7–9 Strategies'],
  },
];

export default function Programs() {
  return (
    <section className="programs" id="programs">
      <div className="section">
        <AnimateOnScroll>
          <div className="section-header">
            <h2>Programs for Every Stage</h2>
            <p>
              From first sums to final exams — we cover every key stage of the British curriculum with expert, personalised instruction.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="programs-grid">
          {PROGRAMS.map((prog, index) => {
            const Icon = prog.icon;
            return (
              <AnimateOnScroll key={prog.stage} staggerIndex={index + 1}>
                <div className={`program-card ${prog.color}`}>
                  <div className="program-card-top">
                    <div className="program-icon-wrap">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>
                    <div className="program-labels">
                      <span className="program-stage">{prog.stage}</span>
                      <span className="program-ages">{prog.ages}</span>
                    </div>
                  </div>

                  <h3 className="program-title">{prog.title}</h3>
                  <p className="program-desc">{prog.description}</p>

                  <ul className="program-topics">
                    {prog.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  <a href="/pricing" className="program-cta">Explore Plan →</a>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
