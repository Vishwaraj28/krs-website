import "./App.css";
import { NewsSection } from "@/components/blocks/homepage/News";
import { EventSections } from "@/components/blocks/homepage/Events";
import { AchieverSection } from "@/components/blocks/homepage/Achievers";
import { SponserSection } from "@/components/blocks/homepage/Sponsers";
import { JoinUsSection } from "@/components/blocks/homepage/JoinUs";
import { PageHeader } from "./components/blocks/common/PageHeader";

function App() {
  return (
    <>
      <main className="min-h-screen">
        <PageHeader />
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
