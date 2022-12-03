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
        {(userStore.isLoggedIn) ? (
          <Link
            to={`/products/${caff.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <CardMedia
              component="img"
              width="140"
              src={caff.file}
              alt={caff.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {caff.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {caff.uploader}
              </Typography>
            </CardContent>
          </Link>
        ) :
          <div>
            <CardMedia
              component="img"
              width="140"
              src={caff.file}
              alt={caff.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {caff.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {caff.uploader}
              </Typography>
            </CardContent>
          </div>
        }
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
