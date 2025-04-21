import useTableData from "@/hooks/useTableData";
import useNavigateTo from "@/hooks/UseNavigateTo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/blocks/common/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SquareArrowOutUpRight } from "lucide-react";
import "swiper/swiper-bundle.css";
import { ProfileCard } from "@/components/blocks/cards/ProfileCard";

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
  const RightContainer = () => {
    if (tableDataLoading) return <p>Loading...</p>;
    if (tableDataError)
      return <p>Ooops..!! We are Facing Some issue Please Try Again later.</p>;

    return (
      <div className="right_container min-w-0">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          loop={true}
          speed={2000}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={true}
          navigation={true}
          slidesPerView={4}
          slidesPerGroup={2}
        >
          {achievers?.map((event: any) => (
            <SwiperSlide key={event.id} className="p-4 !h-auto">
              {/*Added !h-auto to override Swipper CSS*/}
              <ProfileCard
                {...event}
                bucket="krs-homepage-assets"
                image_path={`achievers/${event.image_path}`}
                className="h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return (
    <Container as="section" padding className="events_container">
      <h1 className="text-primary mb-3">Our Achievers</h1>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold mb-4">
          આપણા સમાજના સ્ટાર્સ, જેમણે કેટલીક અસાધારણ સિદ્ધિઓ હાંસલ કરી છે
        </h4>
        <Button onClick={handleCLick}>
          <span>See all events</span>
          <SquareArrowOutUpRight />
        </Button>
      </div>
      <RightContainer />
    </Container>
  );
}
