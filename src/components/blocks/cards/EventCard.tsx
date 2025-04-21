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
import { ImageFromBucket } from "../common/Image";
import { formatDate } from "@/utils/utils";
import thumbnail from "@/assets/thumbnail.jpg";
import useNavigateTo from "@/hooks/UseNavigateTo";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type EventCardVariant = "default" | "simple";

export interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imagePath?: string;
  date: string;
  location: string;
  title: string;
  description: string;
  href: string;
  variant?: EventCardVariant;
  bucket?: string;
}

const cardVariants = cva("", {
  variants: {
    variant: {
      default: "",
      simple: "border-b border-b-primary border-x-0 border-5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function EventCard({
  imagePath: cardImagePath,
  date,
  location,
  title,
  description,
  href,
  variant: cardVariant = "default",
  className,
  bucket,
  ...props
}: EventCardProps) {
  const handleCLick = useNavigateTo(`"${href}`);
  const formattedDate = formatDate(date);

  return (
    <Card
      className={cn(cardVariants({ variant: cardVariant }), className)}
      {...props}
    >
      {cardImagePath && (
        <ImageFromBucket
          bucket={`${bucket}`}
          imagePath={`${cardImagePath}`}
          altImage={thumbnail}
          className="rounded-lg"
        />
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
          size="sm"
        >
          <span>વધુ વાંચો</span>
          <SquareArrowOutUpRight />
        </Button>
      </CardContent>
    </Card>
  );
}
