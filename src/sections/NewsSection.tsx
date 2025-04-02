import { useFetchData } from "@/hooks/UseFetchData";
import { EventCard } from "@/components/blocks/cards/EventCard";

export function NewsSection() {
  const { data: events, isLoading, error } = useFetchData("krs_news_data");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex gap-6 items-center">
      {events?.map((event: any) => (
        <EventCard
          key={event.id}
          date={event.date}
          location={event.location}
          title={event.title}
          description={event.description}
          href={event.href}
          variant="simple"
        />
      ))}
    </div>
  );
}
