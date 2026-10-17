import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";

// The page is just an ordered list of sections, in reading order.
// (The background and navbar come from RootLayout, shared with every page.)
function PortfolioPage() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}

export default PortfolioPage;
