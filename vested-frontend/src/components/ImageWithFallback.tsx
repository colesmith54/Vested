import React, { useState, ImgHTMLAttributes } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  height?: number;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = "",
  height,
  ...rest
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  if (isError || !src) {
    return <QuestionMarkIcon />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      height={height}
      onError={() => setIsError(true)}
      {...rest}
    />
  );
};

export default ImageWithFallback;
