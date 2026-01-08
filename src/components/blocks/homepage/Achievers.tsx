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
import { Separator } from "@/components/ui/separator";

interface AchieverSectionProps {
  fullView?: boolean;
}

export function AchieverSection({ fullView = false }: AchieverSectionProps) {
  const PageTitle = "Our Achievers";
  const PageSubTitle =
    "આપણા સમાજના સ્ટાર્સ, જેમણે કેટલીક અસાધારણ સિદ્ધિઓ હાંસલ કરી છે";
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
      className="relative bg-[#FFE1BA] py-8 sm:py-12 md:py-16 achievers_container"
      id="achievers"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
        style={{
          backgroundImage: `url(${achieversBackground})`,
        }}
      />
      {fullView ? (
        <>
          <h1 className="mb-3 sm:mb-3.5 relative">{PageTitle}</h1>
          <h5 className="mb-3 sm:mb-4 relative">{PageSubTitle}</h5>
          <Separator className="mb-8 sm:mb-10 md:mb-15 relative" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 sm:gap-y-8 md:gap-y-10 gap-x-4 sm:gap-x-5 relative">
            {achievers?.map((achiever: any) => (
              <ProfileCard
                {...achiever}
                bucket="krs-homepage-assets"
                imagePath={`achievers/${achiever.image_path}`}
                className="h-full"
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="mb-3 sm:mb-4 px-3 sm:px-4 md:px-6 relative">
            {PageTitle}
          </h1>
          <FlexBox className="justify-between mb-6 sm:mb-8 md:mb-10 flex-wrap gap-3 sm:gap-4 px-3 sm:px-4 md:px-6 relative">
            <h4 className="w-full sm:w-auto">{PageSubTitle}</h4>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                ref={prevRef}
                variant="outline"
                size="icon"
                className="w-8 h-8 sm:w-9 sm:h-9"
              >
                <ChevronLeft />
              </Button>
              <Button
                ref={nextRef}
                variant="outline"
                size="icon"
                className="w-8 h-8 sm:w-9 sm:h-9"
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
                slidesPerView={2}
                slidesPerGroup={2}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                  },
                  768: {
                    slidesPerView: 3,
                    slidesPerGroup: 2,
                  },
                  1024: {
                    slidesPerView: 4,
                    slidesPerGroup: 2,
                  },
                }}
              >
                {achievers?.map((achiever: any) => (
                  <SwiperSlide
                    key={achiever.id}
                    className="p-2 sm:p-3 !h-auto mb-8 sm:mb-10 md:mb-12"
                  >
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
        </>
      )}
    </Container>
  );
}
