import { useNavigate } from "react-router";

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

export type EventCardVariant = "default" | "simple";
export interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imagePath: string;
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
  ...props
}: EventCardProps) {
  let navigate = useNavigate();
  const handleCLick = () => {
    navigate(href);
  };
  const borderClass =
    "border-b border-b-primary border-x-0 border-6 rounded-xl";
  return (
    <Card className={cardVariant == "simple" ? borderClass : ""} {...props}>
      {cardVariant == "default" && (
        <ImageDisplay src={imagePath} className="rounded-lg" />
      )}
      <CardContent>
        {cardVariant == "simple" && <Separator />}
        <div className="flex space-x-2">
          <Badge>
            <Calendar />
            {date}
          </Badge>
          <Badge>
            <MapPin />
            {location}
          </Badge>
        </div>
        <CardTitle className={cardVariant == "simple" ? "order-first" : ""}>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button
          onClick={handleCLick}
          variant={cardVariant == "simple" ? "outline" : "default"}
        >
          <span>વધુ વાંચો</span>
          <SquareArrowOutUpRight />
        </Button>
      </CardContent>
    </Card>
  );
}
