import useTableData from "@/hooks/useTableData";
import useNavigateTo from "@/hooks/UseNavigateTo";
import { EventCard } from "@/components/blocks/cards/EventCard";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/blocks/common/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SquareArrowOutUpRight } from "lucide-react";
import "swiper/swiper-bundle.css";
import { sortByDate } from "@/utils/utils";

export function EventSections() {
  const {
    data: news,
    isLoading: tableDataLoading,
    error: tableDataError,
  } = useTableData("krs_event_data", [
    "date",
    "location",
    "title",
    "description",
    "href",
    "image_path",
  ]);
  const handleCLick = useNavigateTo("/events");
  const RightContainer = () => {
    if (tableDataLoading) return <p>Loading...</p>;
    if (tableDataError)
      return <p>Ooops..!! We are Facing Some issue Please Try Again later.</p>;
    const sortedNews = sortByDate(news, "latestFirst");

    return (
      <div className="right_container min-w-0">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={1500}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={false}
          navigation={false}
          slidesPerView={3}
          slidesPerGroup={3}
        >
          {sortedNews?.map((event: any) => (
            <SwiperSlide key={event.id} className="p-4 !h-auto">
              {/*Added !h-auto to override Swipper CSS*/}
              <EventCard
                {...event}
                image_path={`events/${event.image_path}`}
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
      <div className="header_container flex gap-3.5 justify-between items-center mb-6 p-4">
        <h1 className="text-primary flex-[0_1_30%]">Events and Updates</h1>
        <div className="right_header_section flex-[0_1_50%]">
          <h4 className="font-semibold mb-4">
            આપણા સમાજમાં વર્ષોથી યોજાતી ઘટનાઓ, જે તમામ આનંદ અને એકતા સાથે
            ઉજવવામાં આવે છે
          </h4>
          <Button onClick={handleCLick}>
            <span>See all events</span>
            <SquareArrowOutUpRight />
          </Button>
        </div>
      </div>
      <RightContainer />
    </Container>
  );
}
