import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import image1 from "@/assets/community-gathering-traditional-indian.jpg";
import image2 from "@/assets/community-service-helping-hands-indian.jpg";
import image3 from "@/assets/traditional-indian-community-gathering-celebration.jpg";

const slides = [
  {
    image: image1,
    title: "શિક્ષણ અને વિકાસ",
    bullet: "આગામી પેઢીઓ માટે શિક્ષણની તકો",
    description:
      "વિદ્યાર્થીઓને શિષ્યવૃત્તિ અને શૈક્ષણિક સહાય પ્રદાન કરીને તેમના ભવિષ્યને ઉજ્જવળ બનાવવું.",
  },
  {
    image: image2,
    title: "સાંસ્કૃતિક પ્રોગ્રામ્સ",
    bullet: "સમાજની સંસ્કૃતિને આગળ વધારવું",
    description: "અમારી સાંસ્કૃતિક વારસાને જાળવી રાખી નવી પેઢીને પ્રેરણા આપવી.",
  },
  {
    image: image3,
    title: "સામાજિક સહકાર",
    bullet: "એકબીજાની મદદ કરવી",
    description: "સામાજિક સેવાઓ અને સહાય પ્રોજેક્ટ્સમાં જોડાવું.",
  },
];

export function MainDisplay() {
  return (
    <div className="relative">
      <Swiper
        modules={[EffectFade, Pagination, Autoplay]}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            // custom numbered bullets
            return `<span class="${className} w-6 h-6 flex items-center justify-center border text-white">${String(
              index + 1
            ).padStart(2, "0")}</span>`;
          },
        }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-[500px] w-full"
        effect={"fade"}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-[500px] w-full">
              <img
                src={slide.image}
                alt={slide.title}
                // fill
                className="object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center px-12">
                <div className="max-w-xl text-white">
                  <h2 className="text-5xl font-extrabold mb-4 text-orange-500">
                    {slide.title}
                  </h2>
                  <ul className="list-disc ml-5 text-lg">
                    <li>{slide.bullet}</li>
                  </ul>
                  <p className="mt-4 text-base">{slide.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
