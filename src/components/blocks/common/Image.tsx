import { cn } from "@/lib/utils";

// Reusable Responsive Image Component
type ImageDisplayProps = {
  src: string;
  alt?: string;
  className?: string;
};

export const ImageDisplay = ({ src, alt, className }: ImageDisplayProps) => {
  const generatedAlt =
    alt || src.split("/").pop()?.split(".").slice(0, -1).join(".");

  return (
    <img
      src={src}
      alt={generatedAlt}
      className={cn("object-cover", className)}
      loading="lazy"
    />
  );
};
