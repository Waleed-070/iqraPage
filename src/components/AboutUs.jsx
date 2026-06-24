import './AboutUs.css';
import { Target, Lightbulb, Heart, BookOpen, Globe } from 'lucide-react';
import founderImg from '../assets/founder.png';
import team1Img from '../assets/team_member_1.png';
import team2Img from '../assets/team_member_2.png';
import team3Img from '../assets/team_member_3.png';
import team4Img from '../assets/team_member_4.png';
import team5Img from '../assets/team_member_5.png';
import team6Img from '../assets/team_member_6.png';
import team7Img from '../assets/team_member_7.png';
import team8Img from '../assets/team_member_8.png';
import team9Img from '../assets/team_member_9.png';
import team1CharImg from '../assets/team_member_1-removebg-preview.png';
import team2CharImg from '../assets/team_member_2-removebg-preview.png';
import team3CharImg from '../assets/team_member_3-removebg-preview.png';
import team4CharImg from '../assets/team_member_4-removebg-preview.png';
import team5CharImg from '../assets/team_member_5-removebg-preview.png';
import team6CharImg from '../assets/team_member_6-removebg-preview.png';
import team7CharImg from '../assets/team_member_7-removebg-preview.png';
import team8CharImg from '../assets/team_member_8-removebg-preview.png';
import team9CharImg from '../assets/team_member_9-removebg-preview.png';

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-header who-we-are-header">
        <h1>Who We Are</h1>
        <div className="title-underline who-we-are-underline"></div>
        <div className="who-we-are-content">
          <p>
            Iqra Virtual Solutions (IVS) is a premier IT and EdTech company based in Peshawar, Pakistan. Established in 2013 and registered with the Pakistan Software Export Board (PSEB), we specialize in delivering high-quality digital solutions to clients across the globe, including the USA, UAE, KSA, and UK.
          </p>
          <p>
            Our mission is to provide affordable, cutting-edge technology that empowers educational institutions and businesses. From custom Learning Management Systems (LMS) to complex cloud infrastructure and automation, we are dedicated to bridging the gap between traditional methods and the digital future.
          </p>
        </div>
      </div>

      <div className="founder-section-wrapper">
        <div className="about-content section">
          <div className="founder-header">
            <h2>Meet Our Founder</h2>
            <div className="title-underline"></div>
          </div>

          <div className="founder-grid">
            <div className="founder-image-column">
              <div className="founder-image-card">
                <img src={founderImg} alt="Dr. Ahmad Ali" />
                <div className="founder-image-overlay">
                  <h3>Dr. Ahmad Ali</h3>
                  <p>FOUNDER & CEO</p>
                </div>
              </div>
            </div>

            <div className="founder-text-column">
              <h3 className="founder-name">Dr. Ahmad Ali</h3>
              <p className="founder-bio">
                Dr. Ahmad Ali is a visionary entrepreneur, respected educator, and IT professional who has dedicated his career to modernizing education through technology. He is the founder of Iqra Virtual Solutions, Iqra Virtual School, QuranHomeTutor.com, and Darul Qurra Global Classroom.
              </p>

              <div className="founder-cards">
                <div className="founder-feature-card">
                  <div className="feature-card-header">
                    <BookOpen size={20} className="feature-icon" />
                    <h4>Academic Excellence</h4>
                  </div>
                  <ul>
                    <li>Ph.D. in Qir'aat</li>
                    <li>M.Phil in Tafsir & Hadith</li>
                    <li>B.A (Hons.) in Usuluddeen</li>
                    <li>Memorized Quran with advanced Tajweed training</li>
                  </ul>
                </div>

                <div className="founder-feature-card">
                  <div className="feature-card-header">
                    <Globe size={20} className="feature-icon" />
                    <h4>Global Impact</h4>
                  </div>
                  <ul>
                    <li>Pioneer of multiple online education platforms helping thousands of students.</li>
                    <li>Established Darulqurra Institute & Abida Sweet Home orphanage.</li>
                    <li>Served as Mohtamim of Madrassa Markazi Darulqurra.</li>
                  </ul>
                </div>
              </div>

              <blockquote className="founder-quote">
                "My vision is to combine strong religious and academic foundations with modern IT, AI, and digital learning to build a future where quality education is accessible and affordable for everyone."
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <div className="about-content section">

        <div className="about-values">
          <div className="value-card">
            <div className="value-icon"><Target size={32} /></div>
            <h3>Our Mission</h3>
            <p>To provide accessible, high-quality, and highly personalised mathematics tuition that helps students achieve their academic goals and unlock their full potential.</p>
          </div>
          <div className="value-card">
            <div className="value-icon"><Lightbulb size={32} /></div>
            <h3>Our Vision</h3>
            <p>To be the premier online destination for mathematics education in the UK and Europe, known for excellence, innovation, and student success.</p>
          </div>
          <div className="value-card">
            <div className="value-icon"><Heart size={32} /></div>
            <h3>Our Core Values</h3>
            <p>Integrity in teaching, commitment to student growth, excellence in delivery, and a continuous passion for learning.</p>
          </div>
        </div>
      </div>

      <div className="team-section section">
        <div className="founder-header">
          <h2>Our Team</h2>
          <div className="title-underline"></div>
        </div>
        
        <div className="team-grid">
          <div className="team-card">
            <div className="wrapper">
              <img src={team1Img} alt="Sarah Jenkins" className="cover-image" />
            </div>
            <img src={team1CharImg} alt="Sarah Jenkins" className="character" />
            <div className="team-info">
              <h3>Sarah Jenkins</h3>
              <p className="team-role">Project Lead & AI Automation</p>
              <div className="team-details">
                <p>Specializes in streamlining workflows and building intelligent, automated cloud solutions.</p>
              </div>
            </div>
          </div>
          <div className="team-card">
            <div className="wrapper">
              <img src={team2Img} alt="David Chen" className="cover-image" />
            </div>
            <img src={team2CharImg} alt="David Chen" className="character" />
            <div className="team-info">
              <h3>David Chen</h3>
              <p className="team-role">Lead Software Engineer (LMS & Web)</p>
              <div className="team-details">
                <p>Architecting robust custom Learning Management Systems and scalable web applications.</p>
              </div>
            </div>
          </div>
          <div className="team-card">
            <div className="wrapper">
              <img src={team3Img} alt="Amira Hassan" className="cover-image" />
            </div>
            <img src={team3CharImg} alt="Amira Hassan" className="character" />
            <div className="team-info">
              <h3>Amira Hassan</h3>
              <p className="team-role">E-Commerce & Growth Specialist</p>
              <div className="team-details">
                <p>Driving digital sales and optimizing online platforms for maximum conversion and growth.</p>
              </div>
            </div>
          </div>
          
          <div className="team-card">
            <div className="wrapper">
              <img src={team4Img} alt="Michael Roberts" className="cover-image" />
            </div>
            <img src={team4CharImg} alt="Michael Roberts" className="character" />
            <div className="team-info">
              <h3>Michael Roberts</h3>
              <p className="team-role">Junior Web Developer</p>
              <div className="team-details">
                <p>Crafting responsive, modern user interfaces with a focus on performance and usability.</p>
              </div>
            </div>
          </div>
          <div className="team-card">
            <div className="wrapper">
              <img src={team5Img} alt="Emma Thompson" className="cover-image" />
            </div>
            <img src={team5CharImg} alt="Emma Thompson" className="character" />
            <div className="team-info">
              <h3>Emma Thompson</h3>
              <p className="team-role">Cyber Security Expert</p>
              <div className="team-details">
                <p>Ensuring data integrity and protecting critical infrastructure from advanced digital threats.</p>
              </div>
            </div>
          </div>
          <div className="team-card">
            <div className="wrapper">
              <img src={team6Img} alt="Omar Farooq" className="cover-image" />
            </div>
            <img src={team6CharImg} alt="Omar Farooq" className="character" />
            <div className="team-info">
              <h3>Omar Farooq</h3>
              <p className="team-role">Junior Software Engineer</p>
              <div className="team-details">
                <p>Developing robust backend services and supporting continuous system integrations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="about-cta-banner">
        <div className="about-cta-content">
          <p className="about-cta-eyebrow">Join IQRA Virtual Academy</p>
          <h2>Ready to Unlock Your Child's Potential?</h2>
          <p className="about-cta-sub">Hundreds of families across the UK and UAE trust us for structured, expert-led, and results-driven online mathematics education — delivered live, 1-to-1.</p>
          <div className="about-cta-buttons">
            <a href="/pricing" className="btn-cta-primary">View Our Plans</a>
            <a href="/contact" className="btn-cta-secondary">Book a Free Session →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
