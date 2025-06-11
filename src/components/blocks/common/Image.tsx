import { cn } from "@/lib/utils";
import { useImageFromBucket } from "@/hooks/useImageFromBucket";
import thumbnail from "@/assets/thumbnail.jpg";
import { isValidValue } from "@/utils/utils";

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

interface ImageFromBucketProps {
  imagePath: string;
  bucket: string;
  altImage?: string;
  className?: string;
}

export function ImageFromBucket({
  imagePath,
  bucket,
  altImage = thumbnail,
  className,
}: ImageFromBucketProps) {
  const isValid = isValidValue(bucket) && isValidValue(imagePath);
  if (!imagePath || !bucket) {
    console.warn("ImageFromBucket: image_path, and bucket are required");
    return null;
  }

  const {
    data: imageURL,
    isLoading,
    error,
  } = useImageFromBucket(bucket, imagePath, {
    enabled: isValid,
  });

  if (isLoading) return <p>Image is Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return <ImageDisplay src={imageURL ?? altImage} className={className} />;
}
