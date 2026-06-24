import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Programs from '../components/Programs';
import Tutors from '../components/Tutors';
import Testimonials from '../components/Testimonials';
import ScrollLine from '../components/ScrollLine';

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <Hero />
      <div style={{ position: 'relative' }}>
        {/* White background */}
        <Benefits />
        {/* Light grey #F8FAFC */}
        <Programs />
        {/* White background */}
        <Tutors />
        {/* Light grey #F8FAFC */}
        <Testimonials />
        {/* Animated scroll drawing line */}
        <ScrollLine />
      </div>
    </div>
  );
}


