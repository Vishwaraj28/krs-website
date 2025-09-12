import { useRef } from "react";
import useTableData from "@/hooks/useTableData";
import useNavigateTo from "@/hooks/UseNavigateTo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/blocks/layout/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SquareArrowOutUpRight, ChevronRight, ChevronLeft } from "lucide-react";
import { ProfileCard } from "@/components/blocks/cards/ProfileCard";
import achieversBackground from "@/assets/achievers_background.png";
import { FlexBox } from "@/components/blocks/layout/FlexBox";

export function AchieverSection() {
  const {
    data: achievers,
    isLoading: tableDataLoading,
    error: tableDataError,
  } = useTableData("krs_achievers_data", [
    "image_path",
    "category",
    "location",
    "title",
    "description",
  ]);

  const handleCLick = useNavigateTo("/achievers");

  // Refs for Swiper nav buttons
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <Container
      wide
      as="section"
      className="relative bg-[#FFE1BA] py-16 achievers_container"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
        style={{
          backgroundImage: `url(${achieversBackground})`,
        }}
      />
      <h1 className="mb-4 px-3 relative">Our Achievers</h1>
      <FlexBox className="justify-between mb-10 flex-wrap gap-2 px-3 relative">
        <h4>આપણા સમાજના સ્ટાર્સ, જેમણે કેટલીક અસાધારણ સિદ્ધિઓ હાંસલ કરી છે</h4>
        <div className="flex items-center gap-2">
          <Button
            ref={prevRef}
            variant="outline"
            size="icon"
            className="w-9 h-9"
          >
            <ChevronLeft />
          </Button>
          <Button
            ref={nextRef}
            variant="outline"
            size="icon"
            className="w-9 h-9"
          >
            <ChevronRight />
          </Button>
          <Button onClick={handleCLick}>
            <span>See all achievers</span>
            <SquareArrowOutUpRight />
          </Button>
        </div>
      </FlexBox>
      <div className="right_container min-w-0">
        {tableDataLoading && <p>Loading...</p>}
        {tableDataError && (
          <p>Ooops..!! We are Facing Some issue. Please try again later.</p>
        )}

        {!tableDataLoading && !tableDataError && (
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            loop={true}
            speed={2000}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={true}
            navigation={{
              prevEl: prevRef.current!,
              nextEl: nextRef.current!,
            }}
            onInit={(swiper) => {
              // Bind navigation once swiper is initialized
              // Must be done like this because refs aren't ready at first render
              //@ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              //@ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            slidesPerView={4}
            slidesPerGroup={2}
          >
            {achievers?.map((achiever: any) => (
              <SwiperSlide key={achiever.id} className="p-3 !h-auto mb-12">
                <ProfileCard
                  {...achiever}
                  bucket="krs-homepage-assets"
                  imagePath={`achievers/${achiever.image_path}`}
                  className="h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </Container>
  );
}
