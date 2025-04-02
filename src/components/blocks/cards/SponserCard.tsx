import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ImageDisplay } from "../common/Image";
import { Flex } from "../common/Container";
import { Globe, List, Mail, MapPin, Phone } from "lucide-react";

export interface SponserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imagePath?: string;
  title: string;
  description?: string;
  mail?: string;
  phone?: string;
  address?: string;
  website?: string;
}

export function SponserCard({
  imagePath,
  title,
  description,
  mail,
  phone,
  address,
  website,
  ...props
}: SponserCardProps) {
  // Define dynamic fields to reduce repetition
  const infoFields = [
    { icon: List, content: description },
    { icon: Mail, content: mail, href: `mailto:${mail}` },
    { icon: Phone, content: phone },
    { icon: MapPin, content: address },
    { icon: Globe, content: website, href: website },
  ];

  return (
    <Card {...props}>
      {imagePath && <ImageDisplay src={imagePath} className="self-center" />}
      <CardTitle className="text-center">{title}</CardTitle>
      <CardContent>
        {infoFields.map(
          (field, index) =>
            field.content && ( // Render only if content exists
              <Flex key={index}>
                <field.icon />
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
              </Flex>
            )
        )}
      </CardContent>
    </Card>
  );
}
