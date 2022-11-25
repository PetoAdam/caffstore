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
import { useStore } from "../../stores";

import { Caff } from "../../types/Caff";

type Props = {
  caff: Caff;
};

export const AdminCaffProductComponent: React.FC<Props> = ({ caff }) => {
  const { userStore } = useStore();

  return (
    <Link
      to={`/admin/products/${caff.id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card sx={{ maxWidth: 350 }}>
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
      </Card>
    </Link>
  );
};
