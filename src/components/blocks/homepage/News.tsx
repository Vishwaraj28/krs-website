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

interface NewsSectionProps {
  fullView?: boolean;
}

export function NewsSection({ fullView = false }: NewsSectionProps) {
  const PageTitle = "Latest News";
  const PageSubTitle = "આગામી ઇવેન્ટ અથવા મીટિંગ વિશે વિગતો";
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
    <Container as="section" className="news_container" id="news">
      {fullView ? (
        <>
          <h1 className="mb-3.5">{PageTitle}</h1>
          <h5 className="mb-4">{PageSubTitle}</h5>
          <Separator className="mb-15" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-5">
            {sortedNews.map((news: any) => (
              <EventCard {...news} variant="simple" className="h-full" />
            ))}
          </div>
        </>
      ) : (
        <FlexBox firstColWidth="27" secondColWidth="72">
          <div className="left_container">
            <h1 className="mb-3.5">{PageTitle}</h1>
            <h4 className="mb-4">{PageSubTitle}</h4>
            {!fullView && (
              <Button onClick={handleCLick}>
                <span>See all news</span>
                <SquareArrowOutUpRight />
              </Button>
            )}
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
                slidesPerView={fullView ? 3 : 2}
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
      )}
    </Container>
  );
}
