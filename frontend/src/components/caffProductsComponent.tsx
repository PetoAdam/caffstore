import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../stores";

import { Caff } from "../types/Caff";

type Props = {
  caff: Caff;
  isAdmin?: boolean;
};

export const CaffProductComponent: React.FC<Props> = ({ caff, isAdmin }) => {
  const { userStore } = useStore();

  const [isAlertDisplayed, setIsAlertDisplayed] = useState(false);

  const onClick = () => {
    const added = userStore.addToCart(caff);

    if (!added) setIsAlertDisplayed(true);
    setTimeout(() => {
      setIsAlertDisplayed(false);
    }, 3000);
  };

  return (
    <>
      <Card sx={{ maxWidth: 350 }}>
        <Link
          to={`/products/${caff.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img src={caff.file} alt={caff.name} loading="eager" height="200" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {caff.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {caff.uploader}
            </Typography>
          </CardContent>
        </Link>

        <CardActions>
          <Button size="small" onClick={onClick}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
      {isAlertDisplayed && (
        <Alert
          variant="outlined"
          severity="warning"
          sx={{ position: "absolute", bottom: 50, left: 50 }}
        >
          This caff is already in your cart
        </Alert>
      )}
    </>
  );
};
