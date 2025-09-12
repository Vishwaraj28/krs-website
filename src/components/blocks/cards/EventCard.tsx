import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import useNavigateTo from "@/hooks/UseNavigateTo";
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
import { ImageFromBucket } from "@/components/blocks/layout/Image";
import { formatDate } from "@/utils/utils";
import thumbnail from "@/assets/thumbnail.jpg";

// 👇 Define card variants using class-variance-authority
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

// 👇 This gives us type-safe access to `variant` prop
type CardVariantProps = VariantProps<typeof cardVariants>;

export interface EventCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariantProps {
  imagePath?: string;
  date: string;
  location: string;
  title: string;
  description: string;
  href: string;
  bucket?: string;
}

export function EventCard({
  imagePath,
  date,
  location,
  title,
  description,
  href,
  variant = "default", // default from cva
  className,
  bucket = "krs-homepage-assets", // optional default
  ...props
}: EventCardProps) {
  const handleCLick = useNavigateTo(`"${href}`);
  const formattedDate = formatDate(date);

  return (
    <Card className={cn(cardVariants({ variant }), className)} {...props}>
      {imagePath && (
        <ImageFromBucket
          bucket={bucket}
          imagePath={imagePath}
          altImage={thumbnail}
          className="rounded-lg"
        />
      )}

      <CardContent className="h-full">
        {variant === "simple" && <Separator />}
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
        <CardTitle className={variant === "simple" ? "order-first" : ""}>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button
          onClick={handleCLick}
          variant={variant === "simple" ? "outline" : "default"}
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
