import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface NewsCardProps {
  title: string;
  source: string;
  image: string;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, source, image, url }) => {
  return (
    <Card>
      <CardActionArea href={url} target="_blank" rel="noopener noreferrer">
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Source: {source}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;
