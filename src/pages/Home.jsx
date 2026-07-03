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
        <Benefits />
        <Programs />
        <Tutors />
        <Testimonials />
        <ScrollLine />
      </div>
    </div>
  );
}


