import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ImageFromBucket } from "../common/Image";
import { Globe, List, Mail, MapPin, Phone } from "lucide-react";
import { FlexBox } from "../common/FlexBox";
import thumbnail from "@/assets/thumbnail.jpg";

export interface SponserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imagePath?: string;
  title: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  bucket?: string;
}

export function SponserCard({
  imagePath,
  title,
  description,
  email,
  phone,
  address,
  website,
  bucket = "krs-homepage-assets", // optional default
  ...props
}: SponserCardProps) {
  const infoFields = [
    { icon: List, content: description },
    { icon: Mail, content: email, href: `mailto:${email}` },
    { icon: Phone, content: phone },
    { icon: MapPin, content: address },
    { icon: Globe, content: website, href: website },
  ];

  return (
    <Card {...props}>
      {imagePath && (
        <ImageFromBucket
          imagePath={imagePath}
          bucket={bucket}
          altImage={thumbnail}
          className="rounded-lg"
        />
      )}
      <CardTitle className="text-center">{title}</CardTitle>
      <CardContent>
        {infoFields.map(
          (field, index) =>
            field.content && (
              <FlexBox firstColWidth="8.5" secondColWidth="92.5" key={index}>
                <field.icon color="#f37e20" />
                <CardDescription>
                  {field.href ? (
                    <a
                      href={field.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {field.content}
                    </a>
                  ) : (
                    field.content
                  )}
                </CardDescription>
              </FlexBox>
            )
        )}
      </CardContent>
    </Card>
  );
}
