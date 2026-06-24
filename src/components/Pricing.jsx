import { Check } from 'lucide-react';
import { AnimateOnScroll } from './ScrollAnimations';
import howItWorksImg from '../assets/how_it_works.png';
import './Pricing.css';

const PLANS = [
  {
    name: '3 Days Plan',
    schedule: 'Monday – Wednesday',
    price: 80,
    featured: false,
    features: [
      '3 live sessions per week',
      '45 minutes per session',
      '1-to-1 personalised tuition',
      'Homework support included',
      'Weekly progress reports',
    ],
  },
  {
    name: '5 Days Plan',
    schedule: 'Monday – Friday',
    price: 120,
    featured: true,
    features: [
      '5 live sessions per week',
      '45 minutes per session',
      '1-to-1 personalised tuition',
      'Homework support included',
      'Daily progress tracking',
      'Priority scheduling',
      'Exam preparation support',
    ],
  },
  {
    name: '2 Days Plan',
    schedule: 'Thursday – Friday',
    price: 60,
    featured: false,
    features: [
      '2 live sessions per week',
      '45 minutes per session',
      '1-to-1 personalised tuition',
      'Homework support included',
      'Fortnightly progress reports',
    ],
  },
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">

      {/* How It Works Section */}
      <div className="how-it-works">
        <div className="hiw-inner section">
          <AnimateOnScroll>
            <div className="hiw-image-col">
              <img
                src={howItWorksImg}
                alt="Student attending a live 1-to-1 online maths tutoring session on a laptop, showing a digital whiteboard and progress dashboard"
                className="hiw-image"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="hiw-text-col">
              <h2 className="hiw-heading">How It Works: 3 Simple Steps to Start Learning</h2>

              <div className="hiw-step">
                <div className="hiw-step-number">1</div>
                <div className="hiw-step-body">
                  <h3>Book Your Free Assessment</h3>
                  <p>We start by evaluating your child's current grade level and identifying specific learning gaps to ensure we build the perfect foundational path.</p>
                </div>
              </div>

              <div className="hiw-step">
                <div className="hiw-step-number">2</div>
                <div className="hiw-step-body">
                  <h3>Get Matched with an Expert Tutor</h3>
                  <p>We pair your child with a dedicated, professional math tutor who matches their personality and unique learning style for long-term consistency.</p>
                </div>
              </div>

              <div className="hiw-step">
                <div className="hiw-step-number">3</div>
                <div className="hiw-step-body">
                  <h3>Track Real-Time Progress</h3>
                  <p>Log into your personalized parent portal anytime to view interactive performance reports, lesson notes, and upcoming schedules.</p>
                </div>
              </div>

              <p className="hiw-footer-note"><em>No long-term contracts. You can switch plans or cancel at any time.</em></p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="section">
        <AnimateOnScroll>
          <div className="section-header">
            <h2>Simple, Transparent Pricing</h2>
            <p>
              Choose the plan that works best for your family. All plans
              include live 1-to-1 sessions with expert tutors.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="pricing-grid">
          {PLANS.map((plan, index) => (
            <AnimateOnScroll key={plan.name} staggerIndex={index + 1}>
              <div className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && (
                  <div className="pricing-badge">Most Popular</div>
                )}

                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-schedule">{plan.schedule}</div>

                <div className="pricing-amount">
                  <span className="pricing-currency">£</span>
                  <span className="pricing-value">{plan.price}</span>
                  <span className="pricing-period"> /month</span>
                </div>

                <div className="pricing-features">
                  {plan.features.map((feature) => (
                    <div key={feature} className="pricing-feature">
                      <div className="pricing-feature-check">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className={`btn pricing-cta ${plan.featured ? 'btn-primary' : 'btn-outline-dark'}`}
                >
                  Get Started
                </a>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="pricing-note">
            <strong>🎁 Free Trial Available!</strong> Try a complimentary session
            before committing. No credit card required.
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
