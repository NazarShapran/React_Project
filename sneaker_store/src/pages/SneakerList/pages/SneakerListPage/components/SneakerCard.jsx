import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

const SneakerCard = ({ sneakers, filteredSneakers }) => {
  const showSneakers =
    filteredSneakers?.length > 0 ? filteredSneakers : sneakers;

  if (!showSneakers || showSneakers.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        No data to display
      </Typography>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 3,
        padding: 3,
      }}
    >
      {showSneakers.map((sneaker) => (
        <Card
          key={sneaker.id}
          sx={{
            width: 300,
            boxShadow: 4,
            borderRadius: 2,
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={sneaker.images[0]?.path}
            alt={sneaker.model}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "center" }}
            >
              {sneaker.brand.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Model: {sneaker.model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${sneaker.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Size: {sneaker.size}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Buy Now
            </Button>
            <Button size="small" color="secondary">
              Details
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default SneakerCard;
