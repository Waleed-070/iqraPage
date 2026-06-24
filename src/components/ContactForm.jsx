import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, Shield, Star, Award } from 'lucide-react';
import { AnimateOnScroll } from './ScrollAnimations';
import './ContactForm.css';

const STEPS = ['Parent Info', 'Student Info', 'Schedule'];

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    studentName: '',
    studentAge: '',
    currentLevel: '',
    preferredDays: '',
    preferredTime: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact" id="contact">
      <div className="section">
        <AnimateOnScroll>
          <div className="section-header">
            <h2>Book Your Free Trial</h2>
            <p>
              Start your child's journey to mathematical excellence today.
              Fill in the form and we'll get in touch within 24 hours.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="contact-wrapper">
          <AnimateOnScroll staggerIndex={1}>
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>
                Have questions? We're here to help you find the perfect
                learning plan for your child.
              </p>

              <div className="contact-details">
                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Email</div>
                    <div className="contact-detail-text">info@iqravirtualacademy.com</div>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Phone</div>
                    <div className="contact-detail-text">+44 (0) 123 456 7890</div>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Sessions</div>
                    <div className="contact-detail-text">Mon–Fri, 3:00 PM – 8:00 PM GMT</div>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Coverage</div>
                    <div className="contact-detail-text">UK & Europe (Online)</div>
                  </div>
                </div>
              </div>

              <div className="contact-trust">
                <p>Trusted by parents</p>
                <div className="trust-items">
                  <span className="trust-item">
                    <Shield size={14} /> Vetted Tutors
                  </span>
                  <span className="trust-item">
                    <Star size={14} /> 4.9★ Rating
                  </span>
                  <span className="trust-item">
                    <Award size={14} /> 500+ Students
                  </span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll staggerIndex={2}>
            <div className="contact-form-panel">
              {submitted ? (
                <div className="form-success">
                  <div className="form-success-icon">
                    <CheckCircle size={36} />
                  </div>
                  <h3>Thank You!</h3>
                  <p>
                    We've received your enquiry and will contact you within
                    24 hours to arrange your free trial session.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Progress Bar */}
                  <div className="form-progress">
                    {STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`form-progress-step ${
                          i === currentStep ? 'active' : ''
                        } ${i < currentStep ? 'completed' : ''}`}
                      />
                    ))}
                  </div>
                  <div className="form-step-label">
                    {STEPS.map((step, i) => (
                      <span
                        key={step}
                        className={i === currentStep ? 'active' : ''}
                      >
                        {step}
                      </span>
                    ))}
                  </div>

                  {/* Step 1: Parent Info */}
                  <div className={`form-step ${currentStep === 0 ? 'active' : ''}`}>
                    <div className="form-group">
                      <label htmlFor="parentName">Full Name</label>
                      <input
                        id="parentName"
                        name="parentName"
                        type="text"
                        className="form-input"
                        placeholder="Your full name"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="form-input"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="form-input"
                          placeholder="+44 XXX XXX XXXX"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-nav">
                      <div></div>
                      <button type="button" className="btn btn-secondary" onClick={nextStep}>
                        Next Step →
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Student Info */}
                  <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
                    <div className="form-group">
                      <label htmlFor="studentName">Student's Name</label>
                      <input
                        id="studentName"
                        name="studentName"
                        type="text"
                        className="form-input"
                        placeholder="Student's full name"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="studentAge">Student's Age</label>
                        <select
                          id="studentAge"
                          name="studentAge"
                          className="form-input"
                          value={formData.studentAge}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select age</option>
                          {Array.from({ length: 11 }, (_, i) => i + 7).map((age) => (
                            <option key={age} value={age}>{age} years old</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="currentLevel">Current Level</label>
                        <select
                          id="currentLevel"
                          name="currentLevel"
                          className="form-input"
                          value={formData.currentLevel}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select level</option>
                          <option value="primary">Primary (KS1/KS2)</option>
                          <option value="secondary">Secondary (KS3)</option>
                          <option value="gcse">GCSE</option>
                          <option value="igcse">IGCSE</option>
                          <option value="a-level">A-Level</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-nav">
                      <button type="button" className="btn btn-back" onClick={prevStep}>
                        ← Back
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={nextStep}>
                        Next Step →
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Schedule */}
                  <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="preferredDays">Preferred Plan</label>
                        <select
                          id="preferredDays"
                          name="preferredDays"
                          className="form-input"
                          value={formData.preferredDays}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a plan</option>
                          <option value="2-days">2 Days (Thu–Fri) — £60/mo</option>
                          <option value="3-days">3 Days (Mon–Wed) — £80/mo</option>
                          <option value="5-days">5 Days (Mon–Fri) — £120/mo</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="preferredTime">Preferred Time Slot</label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          className="form-input"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a time</option>
                          <option value="3pm">3:00 PM – 4:00 PM GMT</option>
                          <option value="4pm">4:00 PM – 5:00 PM GMT</option>
                          <option value="5pm">5:00 PM – 6:00 PM GMT</option>
                          <option value="6pm">6:00 PM – 7:00 PM GMT</option>
                          <option value="7pm">7:00 PM – 8:00 PM GMT</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Additional Notes (Optional)</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-input"
                        placeholder="Tell us about your child's specific needs or any questions you have..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                    <div className="form-nav">
                      <button type="button" className="btn btn-back" onClick={prevStep}>
                        ← Back
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Confirm Free Trial ✨
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
