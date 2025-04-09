import { Calendar, MapPin, SquareArrowOutUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageDisplay } from "../common/Image";
import useNavigateTo from "@/hooks/UseNavigateTo";
import formatDate from "@/utils/utils";

export type EventCardVariant = "default" | "simple";
export interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imagePath?: string;
  date: string;
  location: string;
  title: string;
  description: string;
  href: string;
  variant?: EventCardVariant;
}

export function EventCard({
  imagePath,
  date,
  location,
  title,
  description,
  href,
  variant: cardVariant = "default",
  className = "",
  ...props
}: EventCardProps) {
  const handleCLick = useNavigateTo("/news");
  const formattedDate = formatDate(date);

  const borderClass =
    "border-b border-b-primary border-x-0 border-5 rounded-xl";

  // Merge the className prop with any internal styles
  const cardClassNames = `${
    cardVariant === "simple" ? borderClass : ""
  } ${className}`;

  return (
    <Card className={cardClassNames} {...props}>
      {imagePath && cardVariant === "default" && (
        <ImageDisplay src={imagePath} className="rounded-lg" />
      )}
      <CardContent className="h-full">
        {cardVariant === "simple" && <Separator />}
        <div className="flex gap-3 flex-wrap">
          <Badge>
            <Calendar />
            {formattedDate}
          </Badge>
          <Badge>
            <MapPin />
            {location}
          </Badge>
        </div>
        <CardTitle className={cardVariant === "simple" ? "order-first" : ""}>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button
          onClick={handleCLick}
          variant={cardVariant === "simple" ? "outline" : "default"}
          className="mt-auto"
        >
          <span>વધુ વાંચો</span>
          <SquareArrowOutUpRight />
        </Button>
      </CardContent>
    </Card>
  );
}
