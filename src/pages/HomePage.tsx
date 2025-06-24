import "./App.css";
import { NewsSection } from "@/sections/HomePage/News";
import { EventSections } from "@/sections/HomePage/Events";
import { AchieverSection } from "@/sections/HomePage/Achievers";
import { MainHeader } from "@/sections/HomePage/Header";
import { SponserSection } from "@/sections/HomePage/Sponsers";
import { JoinUsSection } from "@/sections/HomePage/JoinUs";

function App() {
  return (
    <>
      <main className="min-h-screen">
        <MainHeader />
        <h1>This is Home</h1>
        <NewsSection />
        <AchieverSection />
        <JoinUsSection />
        <EventSections />
        <SponserSection />
      </main>
    </>
  );
}

export default App;
