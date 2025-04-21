import useFetchTableData from "@/hooks/UseFetchTableData";
import useNavigateTo from "@/hooks/UseNavigateTo";
import { EventCard } from "@/components/blocks/cards/EventCard";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/blocks/common/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SquareArrowOutUpRight } from "lucide-react";
import "swiper/swiper-bundle.css";

export function NewsSection() {
  const {
    data: news,
    isLoading: tableDataLoading,
    error: tableDataError,
  } = useFetchTableData("krs_news_data", [
    "date",
    "location",
    "title",
    "description",
    "href",
  ]);

  const handleCLick = useNavigateTo("/news");
  const RightContainer = () => {
    if (tableDataLoading) return <p>Loading...</p>;
    if (tableDataError) return <p>Error: {tableDataError.message}</p>;

    const sortedNews = news?.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return (
      <div className="right_container min-w-0 flex-[0_1_70%]">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={1500}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={false}
          navigation={false}
          slidesPerView={2}
          slidesPerGroup={1}
        >
          {sortedNews?.map((event: any) => (
            <SwiperSlide key={event.id} className="p-4 !h-auto">
              {/*Added !h-auto to override Swipper CSS*/}
              <EventCard {...event} variant="simple" className="h-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  return (
    <Container as="section" padding className="news_section_container">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-3.5 items-start left_container flex-[0_1_30%]">
          <h1 className="text-primary">Latest News</h1>
          <h4 className="font-semibold">
            આગામી ઇવેન્ટ અથવા મીટિંગ <br /> વિશે વિગતો
          </h4>
          <Button onClick={handleCLick}>
            <span>See all news</span>
            <SquareArrowOutUpRight />
          </Button>
        </div>
        <RightContainer />
      </div>
    </Container>
  );
}
