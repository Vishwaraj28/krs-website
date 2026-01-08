import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageFromBucket } from "@/components/blocks/layout/Image";
import thumbnail from "@/assets/thumbnail.jpg";

export type ProfileCardVariant = "default" | "wide";
export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imagePath: string;
  category: string;
  location: string;
  title: string;
  description?: string;
  bucket?: string;
  variant?: ProfileCardVariant;
}

export function ProfileCard({
  imagePath,
  category,
  location,
  title,
  description,
  bucket = "krs-homepage-assets", // optional default
  variant: cardVariant = "default",
  ...props
}: ProfileCardProps) {
  return (
    <Card className="gap-4 pt-3 sm:pt-4 pb-5 md:pb-6" {...props}>
      {cardVariant == "default" && (
        <Badge className="margin" shape="square">
          {category}
        </Badge>
      )}
      <ImageFromBucket
        imagePath={imagePath}
        bucket={bucket}
        className={`object-cover rounded-lg self-center ${
          cardVariant == "default" && "w-36 h-36 md:w-48 md:h-48"
        }`}
        altImage={thumbnail}
      />
      <CardContent className="items-center gap-3 md:gap-4">
        {title && (
          <CardDescription className="text-center">{title}</CardDescription>
        )}
        {description && (
          <CardTitle className="text-center">{description}</CardTitle>
        )}
        <Badge>{location}</Badge>
      </CardContent>
    </Card>
  );
}
