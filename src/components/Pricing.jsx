import { Check } from 'lucide-react';
import { AnimateOnScroll } from './ScrollAnimations';
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
