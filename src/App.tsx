import "./App.css";
import { NewsSection } from "@/components/blocks/homepage/News";
import { EventSections } from "@/components/blocks/homepage/Events";
import { AchieverSection } from "@/components/blocks/homepage/Achievers";
import { SponserSection } from "@/components/blocks/homepage/Sponsers";
import { JoinUsSection } from "@/components/blocks/homepage/JoinUs";
import { PageHeader } from "./components/blocks/common/PageHeader";
import { MainDisplay } from "./components/blocks/homepage/MainDisplay";
import { PageFooter } from "./components/blocks/common/PageFooter";

function App() {
  return (
    <>
      <main className="min-h-screen">
        <PageHeader />
        <MainDisplay />
        <NewsSection />
        <AchieverSection />
        <JoinUsSection />
        <EventSections />
        <SponserSection />
        <PageFooter />
      </main>
    </>
  );
}

export default App;
