import { useState } from 'react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';
import './FAQ.css';

import imgUnderstanding from '../assets/faq_understanding.png';
import imgPersonalised from '../assets/faq_personalised.png';
import imgFun from '../assets/faq_fun.png';

const FAQ_CATEGORIES = [
  { id: 'learning', label: 'Learning Approach' },
  { id: 'enrollment', label: 'Enrollment & Results' },
  { id: 'ai', label: 'IQRA & AI' },
];

const FAQS = {
  learning: [
    {
      question: "What makes IQRA Virtual Academy different than tutoring?",
      answer: "Unlike a math class, IQRA Virtual Academy teaches to the individual. Each child is given a comprehensive assessment that pinpoints their exact strengths and weaknesses and a customized learning plan based on their specific learning goals. Our expert instructors provide face-to-face instruction at the right pace for each child."
    },
    {
      question: "What makes IQRA Virtual Academy different than private tutoring?",
      answer: "Unlike private tutors, our curriculum and methodology have been proven through the success of hundreds of students. Tutors are reactive, IQRA is proactive; we build each child's needed mathematical skills methodically and comprehensively. Backed by the extensive training and resources of our organization, our instructors deliver a superior method, typically at a lower cost."
    },
    {
      question: "Is IQRA Virtual Academy for advanced students or struggling students?",
      answer: "Both. If a student is struggling, IQRA will address their learning gaps so they can catch up and get ahead. For students who already excel in math, the instructors will work with them to expand their math skills and help them achieve their greatest potential. And if your student is \"doing OK\" when you know they could do much better, we can engage and motivate your child to reach new heights."
    },
    {
      question: "What age students does IQRA Virtual Academy work with?",
      answer: "We work with children in Key Stage 1 through to GCSE and A-Level."
    },
    {
      question: "What is the IQRA Method™?",
      answer: "The IQRA Method™ is a proprietary approach that builds math mastery through deep understanding by starting with what students already know, addressing learning gaps, expanding mathematical thinking, and adding new concepts in sequence. The method uses a four-step process: Assessment, Customized learning plans, Teaching for understanding (rather than memorization), and Goal achievement. The IQRA Method™ approach is also individualized for each child’s strengths, personalities, and opportunities for growth."
    },
    {
      question: "Do you give homework to students?",
      answer: "No. All learning occurs under the efficient and effective guidance of our trained instructors. Adding homework would risk frustration and overload. In fact, we'll set aside some time each session to help your student with their school homework."
    },
    {
      question: "What happens during the initial assessment at IQRA Virtual Academy?",
      answer: "At IQRA, we understand that assessments can sometimes feel stressful for students. That’s why we take a personalized and engaging approach to each assessment. We start by building rapport with your child and setting expectations. We conduct both a verbal and written assessment to identify your child’s strengths and areas for improvement as well as to gain a true understanding of how each student approaches and thinks about math. More importantly, our assessments don’t feel like a test — we use interactive methods to ensure your child feels comfortable and confident."
    },
    {
      question: "What type of questions are on the assessment?",
      answer: "We carefully craft our assessment questions to evaluate specific skills that are critical for success in math. Our assessments cover a wide range of math skills and concepts, including grade-level or subject-specific skills, number sense, and concepts unique to IQRA. We use a combination of verbal and written questions, and it's possible that some of the questions may cover topics your child hasn't yet learned in school. Our goal is to get a comprehensive understanding of your child's current math abilities, so we can create a personalized learning plan that meets their unique needs and goals."
    },
    {
      question: "What do students gain from the IQRA Method™?",
      answer: "Students who learn through the IQRA Method™ experience more than just improved math skills. They develop a deeper understanding of concepts and strengthen their ability to think critically. These skills often extend to subjects beyond math, as students naturally become more confident, curious, and resilient. Your child may come here for math, but they’ll leave with a love of learning that benefits them in university, career, and beyond."
    }
  ],
  enrollment: [
    {
      question: "What does IQRA Virtual Academy cost?",
      answer: "IQRA provides premium value by combining a superior learning experience with an efficient structure that keeps costs low. There is a flat enrollment fee for our program, and students attend regularly. We recommend that they attend 2-3 times per week as attending less frequently will slow results and attending too often could lead to student burnout. Pricing varies by program. Contact us for more details on enrollment packages."
    },
    {
      question: "What kind of results does IQRA Virtual Academy get?",
      answer: "Children who consistently attend our online sessions enjoy a transformative learning experience and make huge strides in the classroom. Independent studies have found our methodology to improve student performance on standards-based tests in 20 sessions or fewer."
    },
    {
      question: "How long does my child need to attend IQRA Virtual Academy?",
      answer: "We recommend 2-3 times a week until learning goals are met and parents are satisfied with what their child has accomplished."
    },
    {
      question: "Is there an IQRA Virtual Academy near me?",
      answer: "Since we are a 100% virtual academy, we are available everywhere! Students from across the UK, Europe, and the UAE can join our live online sessions from the comfort of their homes."
    },
    {
      question: "What if I can't get my child to attend twice each week?",
      answer: "We realize that with busy family schedules it can be hard committing to twice a week. That's why we offer flexible scheduling for our online sessions. If your child is still unable to attend, they won't miss anything because we work at their pace and will simply meet them where they are at their next session."
    }
  ],
  ai: [
    {
      question: "What is the difference between AI tutoring and the IQRA program?",
      answer: "AI bots generate instant responses based on patterns in data and can help students reach answers quickly, but they lack depth and accuracy. Although an AI bot can be useful in scouring the web for information, it can’t pick up on your child’s cues and take the time to ensure true comprehension. It also can’t nurture your child’s wins or reward them for a job well done. IQRA meets students where they are and leads them through all stages in their math journey. We train our instructors in the proven IQRA Method™ and emphasize trust, consistency, and deep understanding."
    },
    {
      question: "How reliable is AI tutoring?",
      answer: "While AI offers exciting possibilities — like instant feedback, personalized practice, and data-driven insights — it’s not a substitute for a human tutor. AI tools can support learning by reinforcing concepts and sparking curiosity, but they lack the nuance and accuracy needed for deep understanding. That’s why IQRA remains the gold standard: Our expert instructors focus on building true comprehension, tailoring each session to the student’s unique learning style, and guiding them with empathy and expertise that no algorithm can replicate."
    },
    {
      question: "Can AI understand my child's unique learning style?",
      answer: "AI-powered tools can be helpful for quick answers and extra practice, and they’re getting better at mimicking personalized learning. Even the most advanced bots rely on patterns and they don’t truly adapt to how your child learns, thinks, or feels. IQRA instructors assess and adjust in real time, using a blend of mental, visual, verbal, tactile, and written strategies to create a learning experience that’s as unique as your child. While AI can support learning, IQRA delivers the human connection and insight that fosters real understanding and long-term confidence."
    },
    {
      question: "Can AI help with critical thinking skills like IQRA does?",
      answer: "While AI does have abilities that are incomparable to any human being, AI programs for tutoring were built for cognitive development through problem-solving games. They are great for enrichment but aren’t necessarily designed to support critical-thinking skills. In fact, recent research from Microsoft and Carnegie Mellon University found that outsourcing tasks to AI chatbots may actually hinder critical-thinking development. IQRA’s method specifically builds critical thinking by guiding students through the reasoning process, not just providing answers."
    },
    {
      question: "How do I know the answers from AI are correct?",
      answer: "Unfortunately, you don’t know unless you use your own time to fact-check it. AI bots can sound confident even when they’re wrong. They’ve been built to reach answers, which means they will add placeholders, make assumptions, and “fill in the blanks.” It’s great for quick information, but when it comes to actual learning for your child — human tutors are still the preferred method. A recent report from the Wall Street Journal found that an AI tutor built for kids struggled with basic math and made frequent calculation errors."
    }
  ]
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('learning');
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleTabClick = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveIndex(null); // Reset accordion when switching tabs
  };

  const [searchQuery, setSearchQuery] = useState('');

  const currentFaqs = (FAQS[activeCategory] || []).filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="faq-section">
      <div className="faq-header">
        <h2>IQRA Virtual Academy Frequently Asked Questions</h2>
        
        <div className="faq-search-container" style={{ maxWidth: '600px', margin: '0 auto 2.5rem', position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input 
            type="text" 
            placeholder="Search for topics, features, or enrollment questions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '16px 20px 16px 52px', 
              borderRadius: '50px', 
              border: '1px solid rgba(0,0,0,0.1)',
              fontSize: '1.05rem',
              outline: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              fontFamily: 'var(--font-heading)'
            }}
          />
        </div>

        <div className="faq-tabs">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`faq-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleTabClick(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="faq-container section">
        <div className="faq-accordion">
          {currentFaqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-trigger"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <span className="faq-trigger-text">{faq.question}</span>
                <ChevronDown 
                  className="faq-trigger-icon" 
                  size={20} 
                  style={{ 
                    transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: activeIndex === index ? 'var(--primary)' : 'var(--text)'
                  }} 
                />
              </button>
              
              <div className="faq-content">
                <div className="faq-content-inner">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How We're Different Section */}
    <section className="faq-different-section">
        <h2 className="faq-different-title">How We're Different</h2>
        <div className="faq-different-grid">
          <div className="faq-card">
            <img src={imgUnderstanding} alt="Teaching for Understanding" />
            <div className="faq-card-content">
              <h3>Teaching for Understanding</h3>
              <p>Delivering our proprietary curriculum face-to-face in a way that makes sense to kids.</p>
              <a href="/about" className="faq-card-link">
                Discover the IQRA Method™ <span className="arrow">▶</span>
              </a>
            </div>
          </div>
          
          <div className="faq-card">
            <img src={imgPersonalised} alt="Personalised Learning Paths" />
            <div className="faq-card-content">
              <h3>Personalised Learning Paths</h3>
              <p>Teaching each individual exactly what they need to learn, and building on it.</p>
              <a href="/curriculum" className="faq-card-link">
                How It Works <span className="arrow">▶</span>
              </a>
            </div>
          </div>
          
          <div className="faq-card">
            <img src={imgFun} alt="Kids Have Fun at IQRA Virtual Academy" />
            <div className="faq-card-content">
              <h3>Kids Have Fun at IQRA Virtual Academy</h3>
              <p>Our math tutors are trained to make learning math a fun and confidence-building experience.</p>
              <a href="/pricing" className="faq-card-link">
                How We Compare <span className="arrow">▶</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section style={{ backgroundColor: '#f8fafc', padding: '5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text)', marginBottom: '1rem', fontWeight: 700 }}>
            💬 Can't find what you're looking for?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Our admissions team is always here to help. Reach out directly and we'll get back to you within 24 hours.
          </p>
          <a href="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', fontSize: '1.05rem' }}>
            <MessageCircle size={20} /> Speak to an Expert
          </a>
        </div>
      </section>
    </>
  );
}
