import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageFromBucket } from "../common/Image";

export type ProfileCardVariant = "default" | "wide";
export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image_path: string;
  category: string;
  location: string;
  title: string;
  description?: string;
  bucket?: string;
  variant?: ProfileCardVariant;
}

export function ProfileCard({
  image_path: cardImagePath,
  category,
  location,
  title,
  description,
  bucket,
  variant: cardVariant = "default",
  ...props
}: ProfileCardProps) {
  return (
    <Card className="gap-4 pt-4 pb-6" {...props}>
      {cardVariant == "default" && (
        <Badge className="margin" shape="square">
          {category}
        </Badge>
      )}
      <ImageFromBucket
        imagePath={`${cardImagePath}`}
        bucket={`${bucket}`}
        className={`object-cover rounded-lg self-center ${
          cardVariant == "default" && "w-48 h-48"
        }`}
      />
      <CardContent className="items-center gap-4">
        {title && (
          <CardDescription className="text-center">{title}</CardDescription>
        )}
        <CardTitle className="text-center">{description}</CardTitle>
        <Badge>{location}</Badge>
      </CardContent>
    </Card>
  );
}
