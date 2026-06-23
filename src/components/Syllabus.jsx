import { useState } from 'react';
import {
  Calculator, Sigma, Triangle, Percent, PieChart,
  BarChart3, Puzzle, ChevronDown, Award
} from 'lucide-react';
import { AnimateOnScroll } from './ScrollAnimations';
import './Syllabus.css';

const CURRICULUM_BADGES = [
  'British National Curriculum',
  'GCSE Maths',
  'IGCSE Maths',
  'European Standards',
];

const TOPICS = [
  {
    icon: Calculator,
    title: 'Basic Mathematics',
    description: 'Building strong foundations with number operations, place value, and mathematical reasoning.',
    subtopics: ['Number Operations', 'Place Value', 'Order of Operations', 'Estimation', 'Mental Arithmetic'],
  },
  {
    icon: Sigma,
    title: 'Algebra',
    description: 'From expressions to equations — developing algebraic thinking and problem-solving skills.',
    subtopics: ['Expressions & Formulae', 'Linear Equations', 'Inequalities', 'Sequences', 'Simultaneous Equations'],
  },
  {
    icon: Triangle,
    title: 'Geometry',
    description: 'Exploring shapes, angles, transformations, and spatial reasoning in 2D and 3D.',
    subtopics: ['Angles & Properties', 'Area & Perimeter', 'Volume & Surface Area', 'Transformations', 'Coordinate Geometry'],
  },
  {
    icon: PieChart,
    title: 'Fractions & Decimals',
    description: 'Mastering fractions, decimals, and their operations for real-world applications.',
    subtopics: ['Simplifying Fractions', 'Mixed Numbers', 'Decimal Operations', 'Converting Forms', 'Ratio & Proportion'],
  },
  {
    icon: Percent,
    title: 'Percentages',
    description: 'Understanding percentage calculations, changes, and their everyday applications.',
    subtopics: ['Percentage of Amounts', 'Percentage Change', 'Reverse Percentages', 'Compound Interest', 'Real-World Problems'],
  },
  {
    icon: Triangle,
    title: 'Trigonometry',
    description: 'Exploring trigonometric ratios, graphs, and their applications in geometry.',
    subtopics: ['Sin, Cos, Tan', 'Right-Angled Triangles', 'Trigonometric Graphs', 'Sine & Cosine Rules', 'Bearings'],
  },
  {
    icon: BarChart3,
    title: 'Statistics & Probability',
    description: 'Collecting, analysing, and interpreting data with statistical methods and probability.',
    subtopics: ['Averages & Range', 'Data Representation', 'Probability', 'Cumulative Frequency', 'Histograms'],
  },
  {
    icon: Puzzle,
    title: 'Complex Problem Solving',
    description: 'Advanced multi-step problems that integrate multiple mathematical concepts.',
    subtopics: ['Multi-Step Problems', 'Proof & Reasoning', 'Functional Maths', 'Exam Technique', 'Past Paper Practice'],
  },
];

export default function Syllabus() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="syllabus" id="syllabus">
      <div className="section">
        <AnimateOnScroll>
          <div className="section-header">
            <h2>Our Curriculum</h2>
            <p>
              A comprehensive mathematics programme covering all key topics,
              aligned with internationally recognised standards.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="syllabus-badges">
            {CURRICULUM_BADGES.map((badge) => (
              <span key={badge} className="syllabus-badge">
                <Award size={16} />
                {badge}
              </span>
            ))}
          </div>
        </AnimateOnScroll>

        <div className="syllabus-accordion">
          {TOPICS.map((topic, index) => {
            const Icon = topic.icon;
            const isActive = activeIndex === index;
            return (
              <AnimateOnScroll key={topic.title} staggerIndex={Math.min(index + 1, 8)}>
                <div className={`syllabus-item ${isActive ? 'active' : ''}`}>
                  <button
                    className="syllabus-trigger"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isActive}
                    aria-controls={`syllabus-content-${index}`}
                  >
                    <div className="syllabus-trigger-icon">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <span className="syllabus-trigger-text">{topic.title}</span>
                    <ChevronDown className="syllabus-trigger-arrow" size={20} />
                  </button>
                  <div
                    className="syllabus-content"
                    id={`syllabus-content-${index}`}
                    role="region"
                  >
                    <div className="syllabus-content-inner">
                      <p className="syllabus-description">{topic.description}</p>
                      <div className="syllabus-topics">
                        {topic.subtopics.map((sub) => (
                          <span key={sub} className="syllabus-topic">{sub}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
