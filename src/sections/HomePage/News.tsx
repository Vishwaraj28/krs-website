import useTableData from "@/hooks/useTableData";
import useNavigateTo from "@/hooks/UseNavigateTo";
import { EventCard } from "@/components/blocks/cards/EventCard";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/blocks/common/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SquareArrowOutUpRight } from "lucide-react";
import { sortByDate } from "@/utils/utils";
import { FlexBox } from "@/components/blocks/common/FlexBox";

export function NewsSection() {
  const {
    data: news,
    isLoading: tableDataLoading,
    error: tableDataError,
  } = useTableData("krs_news_data", [
    "date",
    "location",
    "title",
    "description",
    "href",
  ]);

  const handleCLick = useNavigateTo("/news");
  const sortedNews = news ? sortByDate(news, "latestFirst") : [];

  return (
    <Container as="section" className="news_container">
      <FlexBox firstColWidth="30" secondColWidth="70">
        <div className="left_container">
          <h1 className="mb-3.5">Latest News</h1>
          <h4 className="mb-4">
            આગામી ઇવેન્ટ અથવા મીટિંગ <br /> વિશે વિગતો
          </h4>
          <Button onClick={handleCLick}>
            <span>See all news</span>
            <SquareArrowOutUpRight />
          </Button>
        </div>
        {/* Swiper Section */}
        <div className="right_container min-w-0">
          {tableDataLoading && <p>Loading...</p>}
          {tableDataError && <p>Error: {tableDataError.message}</p>}

          {!tableDataLoading && !tableDataError && sortedNews.length > 0 && (
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
              {sortedNews.map((news: any) => (
                <SwiperSlide key={news.id} className="p-4 !h-auto">
                  <EventCard {...news} variant="simple" className="h-full" />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </FlexBox>
    </Container>
  );
}
