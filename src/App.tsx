import "./App.css";
import { ProfileCard } from "./components/blocks/cards/ProfileCard";
import { SponserCard } from "./components/blocks/cards/SponserCard";

import thumbnail from "@/assets/thumbnail.jpg";
import SponserImage from "@/assets/Sample Sponser logo.svg";
import { NewsSection } from "@/sections/NewsSection";

function App() {
  return (
    <>
      <main className="min-h-screen p-8">
        <div className="container mx-auto space-y-8">
          <h1>This is Home</h1>
          <NewsSection />
          <div className="flex gap-6 items-center">
            <ProfileCard
              imagePath={thumbnail}
              category="શિક્ષણ"
              location="ગામ: આલીદર, ગીર-સોમનાથ"
              title="M.B.B.S. પૂર્ણ કરવા બદલ અભિનંદન"
              description="જયેશભાઈ વિજયભાઈ પરમાર"
            />
            <ProfileCard
              imagePath={thumbnail}
              category="શિક્ષણ"
              location="ગામ: આલીદર, ગીર-સોમનાથ"
              title="M.B.B.S. પૂર્ણ કરવા બદલ અભિનંદન"
              description="જયેશભાઈ વિજયભાઈ પરમાર"
            />
            <ProfileCard
              imagePath={thumbnail}
              category="શિક્ષણ"
              location="ગામ: આલીદર, ગીર-સોમનાથ"
              title="M.B.B.S. પૂર્ણ કરવા બદલ અભિનંદન"
              description="જયેશભાઈ વિજયભાઈ પરમાર"
              variant="wide"
            />
            <ProfileCard
              imagePath={thumbnail}
              category="શિક્ષણ"
              location="ગામ: આલીદર, ગીર-સોમનાથ"
              title="શુભેચ્છા સહ…જય ભવાની પરમાર પરિવાર"
              variant="wide"
            />
          </div>
          <div className="flex gap-6 items-center">
            <SponserCard
              imagePath={SponserImage}
              title="Company Lorem Ipsum"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis quisquam officia molestias velit minima labore commodi animi, tenetur itaque harum?"
              mail="loremIpsum11584@gmail.com"
              phone="+91-1234567890"
              address="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis quisquam officia molestias velit minima labore commodi animi, tenetur itaque harum?"
              website="https://www.loremipsum.com"
            />
            <SponserCard
              imagePath={SponserImage}
              title="Company Lorem Ipsum"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis quisquam officia molestias velit minima labore commodi animi, tenetur itaque harum?"
              mail="loremIpsum11584@gmail.com"
            />
            <SponserCard
              imagePath={SponserImage}
              title="Company Lorem Ipsum"
              description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis quisquam officia molestias velit minima labore commodi animi, tenetur itaque harum?"
              mail="loremIpsum11584@gmail.com"
              phone="+91-1234567890"
              address="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis quisquam officia molestias velit minima labore commodi animi, tenetur itaque harum?"
              website="https://www.loremipsum.com"
            />
            <SponserCard
              imagePath={SponserImage}
              title="Company Lorem Ipsum"
              phone="+91-1234567890"
              address="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis quisquam officia molestias velit minima labore commodi animi, tenetur itaque harum?"
              website="https://www.loremipsum.com"
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
