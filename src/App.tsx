import "./App.css";
import { NewsSection } from "@/pages/homepage/sections/News";
import { EventSections } from "@/pages/homepage/sections/Events";
import { AchieverSection } from "@/pages/homepage/sections/Achievers";
import { MainHeader } from "@/pages/homepage/sections/Header";
import { SponserSection } from "@/pages/homepage/sections/Sponsers";
import { JoinUsSection } from "@/pages/homepage/sections/JoinUs";

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
