import "./App.css";
// import { ProfileCard } from "./components/blocks/cards/ProfileCard";
// import { SponserCard } from "./components/blocks/cards/SponserCard";

// import thumbnail from "@/assets/thumbnail.jpg";
// import SponserImage from "@/assets/Sample Sponser logo.svg";
import { NewsSection } from "@/sections/News";
import { EventSections } from "./sections/Events";
import { AchieverSection } from "./sections/Achievers";

function App() {
  return (
    <>
      <main className="min-h-screen">
        <h1>This is Home</h1>
        <NewsSection />
        <AchieverSection />
        <EventSections />
      </main>
    </>
  );
}

export default App;
