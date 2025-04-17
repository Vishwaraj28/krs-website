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
import useNavigateTo from "@/hooks/useNavigateTo";
import { formatDate } from "@/utils/utils";
import { useImageFromBucket } from "@/hooks/useImageFromBucket";
import thumbnail from "@/assets/thumbnail.jpg";

export type EventCardVariant = "default" | "simple";

export interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image_path?: string;
  date: string;
  location: string;
  title: string;
  description: string;
  href: string;
  variant?: EventCardVariant;
}

export function EventCard({
  image_path,
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

  const {
    data: imageURL,
    isLoading: imageLoading,
    error: imageError,
  } = useImageFromBucket("krs-homepage-assets", `${image_path}`, {
    enabled: !!image_path && cardVariant === "default",
  });

  const formattedDate = formatDate(date);

  const borderClass =
    "border-b border-b-primary border-x-0 border-5 rounded-xl";
  const cardClassNames = `${
    cardVariant === "simple" ? borderClass : ""
  } ${className}`;

  const ImageComponent = () => {
    if (image_path && cardVariant === "default") {
      if (imageLoading) return <p>Image is Loading..</p>;
      if (imageError) return <p>{imageError.message}</p>;

      return (
        <ImageDisplay src={imageURL ?? thumbnail} className="rounded-lg" />
      );
    }
    return null;
  };

  return (
    <Card className={cardClassNames} {...props}>
      <ImageComponent />
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
          size="sm"
        >
          <span>વધુ વાંચો</span>
          <SquareArrowOutUpRight />
        </Button>
      </CardContent>
    </Card>
  );
}
