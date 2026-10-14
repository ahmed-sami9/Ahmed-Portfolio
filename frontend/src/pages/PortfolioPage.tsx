import Background from "../components/layout/Background";
import Navbar from "../components/layout/Navbar";
import Hero from "../sections/Hero";

// The page is just an ordered list of sections. New sections (Projects, About, Contact)
// get added inside <main> in reading order.
function PortfolioPage() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}

export default PortfolioPage;
