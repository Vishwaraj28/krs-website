import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type ProfileCardVariant = "default" | "wide";
export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imagePath: string;
  category: string;
  location: string;
  title: string;
  description?: string;
  variant?: ProfileCardVariant;
}

export function ProfileCard({
  imagePath,
  category,
  location,
  title,
  description,
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
      <img
        src={imagePath}
        alt={imagePath.split("/").pop()?.split(".").slice(0, -1).join(".")}
        className={`object-cover rounded-lg self-center ${
          cardVariant == "default" ? "w-48 h-48" : ""
        }`}
      />
      <CardContent className="w-80 items-center gap-4">
        {description && <CardDescription>{description}</CardDescription>}
        <CardTitle className="text-center">{title}</CardTitle>
        <Badge>{location}</Badge>
      </CardContent>
    </Card>
  );
}
