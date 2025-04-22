import useTableData from "@/hooks/useTableData";
import useNavigateTo from "@/hooks/UseNavigateTo";
import { EventCard } from "@/components/blocks/cards/EventCard";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/blocks/common/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SquareArrowOutUpRight } from "lucide-react";
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
  const sortedNews = news ? sortByDate(news, "latestFirst") : [];

  return (
    <Container as="section" className="events_container my-4 py-8">
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
      {/* Swiper Section */}
      <div className="right_container min-w-0">
        {tableDataLoading && <p>Loading...</p>}
        {tableDataError && (
          <p>Ooops..!! We are Facing Some issue. Please Try Again later.</p>
        )}

        {!tableDataLoading && !tableDataError && sortedNews.length > 0 && (
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
                <EventCard
                  {...event}
                  bucket="krs-homepage-assets"
                  imagePath={`events/${event.image_path}`}
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
