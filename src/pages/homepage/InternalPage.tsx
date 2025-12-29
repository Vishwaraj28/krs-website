import { useParams } from "react-router";
import { NewsSection } from "@/components/blocks/homepage/News";
import { EventSections } from "@/components/blocks/homepage/Events";
import { AchieverSection } from "@/components/blocks/homepage/Achievers";
import { PageHeader } from "@/components/blocks/common/PageHeader";
import { PageFooter } from "@/components/blocks/common/PageFooter";

function InternalPage() {
  const { slug } = useParams<{ slug: string }>();

  // Render section based on slug with fullView prop
  const renderSection = () => {
    switch (slug) {
      case "news":
        return <NewsSection fullView />;
      case "achievers":
        return <AchieverSection fullView />;
      case "events":
        return <EventSections fullView />;
      default:
        return (
          <>
            <NewsSection />
            <AchieverSection />
            <EventSections />
          </>
        );
    }
  };

  return (
    <>
      <main className="min-h-screen">
        <PageHeader hideNav />
        {renderSection()}
        <PageFooter />
      </main>
    </>
  );
}

export default InternalPage;
