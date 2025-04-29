import "./App.css";
import { NewsSection } from "@/sections/News";
import { EventSections } from "./sections/Events";
import { AchieverSection } from "./sections/Achievers";
// import { MainHeader } from "./sections/Header";
import { SponserSection } from "./sections/Sponsers";

function App() {
  return (
    <>
      <main className="min-h-screen">
        {/* <h1>This is Home</h1> */}
        <NewsSection />
        {/* <MainHeader /> */}
        <AchieverSection />
        <EventSections />
        <SponserSection />
      </main>
    </>
  );
}

export default App;
