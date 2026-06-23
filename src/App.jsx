import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Syllabus from './components/Syllabus';
import Pricing from './components/Pricing';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Syllabus />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
