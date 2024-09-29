import React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardMedia, CardActionArea } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MultiCarousalList = ({ imageList }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };

  return (
    <Box sx={{ marginLeft: 2, marginTop: 2, marginBottom: 5 }}>
      <Carousel responsive={responsive}>
        {imageList?.map((item) => (
          <Card
            key={item.key}
            sx={{
              marginTop: 1,
              marginRight: 2,
              height: "600px",
              "&:hover": {
                transform: "scale(1.5)",
              },
              p: 1,
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="50%"
                image={item.imageUrl}
                alt="Image"
              />
            </CardActionArea>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

MultiCarousalList.propTypes = {
  imageList: PropTypes.array.isRequired,
};

export default MultiCarousalList;
