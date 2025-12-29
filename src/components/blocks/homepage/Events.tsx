import useTableData from "@/hooks/useTableData";
import useNavigateTo from "@/hooks/UseNavigateTo";
import { EventCard } from "@/components/blocks/cards/EventCard";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/blocks/layout/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SquareArrowOutUpRight } from "lucide-react";
import { sortByDate } from "@/utils/utils";
import { FlexBox } from "@/components/blocks/layout/FlexBox";
import { Separator } from "@/components/ui/separator";

interface EventSectionsProps {
  fullView?: boolean;
}

export function EventSections({ fullView = false }: EventSectionsProps) {
  const PageTitle = "Events and Updates";
  const PageSubTitle =
    "આપણા સમાજમાં વર્ષોથી યોજાતી ઘટનાઓ, જે તમામ આનંદ અને એકતા સાથે ઉજવવામાં આવે છે";
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
  const sortedEvents = news ? sortByDate(news, "latestFirst") : [];

  return (
    <Container as="section" className="events_container" id="events">
      {fullView ? (
        <>
          <h1 className="mb-3.5">{PageTitle}</h1>
          <h5 className="mb-4">{PageSubTitle}</h5>
          <Separator className="mb-15" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-5">
            {sortedEvents.map((news: any) => (
              <EventCard {...news} variant="simple" className="h-full" />
            ))}
          </div>
        </>
      ) : (
        <>
          <FlexBox
            firstColWidth="30"
            secondColWidth="60"
            className="header_container gap-3.5 justify-between mb-6 p-4"
          >
            <h1 className="left_header_section">{PageTitle}</h1>
            <div className="right_header_section">
              <h4 className="mb-4">{PageSubTitle}</h4>
              {!fullView && (
                <Button onClick={handleCLick}>
                  <span>See all events</span>
                  <SquareArrowOutUpRight />
                </Button>
              )}
            </div>
          </FlexBox>
          {/* Swiper Section */}
          <div className="min-w-0">
            {tableDataLoading && <p>Loading...</p>}
            {tableDataError && (
              <p>Ooops..!! We are Facing Some issue. Please Try Again later.</p>
            )}

            {!tableDataLoading &&
              !tableDataError &&
              sortedEvents.length > 0 && (
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
                  slidesPerView={fullView ? 4 : 3}
                  slidesPerGroup={3}
                >
                  {sortedEvents?.map((event: any) => (
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
        </>
      )}
    </Container>
  );
}
