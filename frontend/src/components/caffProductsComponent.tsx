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

enum alertTypes {
  none,
  success,
  error,
}

export const CaffProductComponent: React.FC<Props> = ({ caff }) => {
  const { userStore } = useStore();

  const [isAlertDisplayed, setIsAlertDisplayed] = useState(alertTypes.none);

  const onClick = () => {
    const added = userStore.addToCart(caff);

    if (!added) setIsAlertDisplayed(alertTypes.error);
    else setIsAlertDisplayed(alertTypes.success);
    setTimeout(() => {
      setIsAlertDisplayed(alertTypes.none);
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
          </CardContent>
        </Link>

        <CardActions>
          <Button size="small" onClick={onClick}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
      {isAlertDisplayed !== alertTypes.none && (
        <Alert
          variant="outlined"
          severity={
            isAlertDisplayed === alertTypes.error ? "warning" : "success"
          }
          sx={{ position: "absolute", bottom: 50, left: 50 }}
        >
          {isAlertDisplayed === alertTypes.error
            ? "This caff is already in your cart"
            : "Added"}
        </Alert>
      )}
    </>
  );
};
