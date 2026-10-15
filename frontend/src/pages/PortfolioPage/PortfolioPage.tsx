import Background from "@/components/layout/Background";
import Navbar from "@/components/layout/Navbar";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";

// The page is just an ordered list of sections, in reading order.
function PortfolioPage() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default PortfolioPage;
