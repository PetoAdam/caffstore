import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

import React, { useState } from "react";

import { Caff } from "../types/Caff";

type Props = {
  caff: Caff;
};

export const CaffProductComponent: React.FC<Props> = ({ caff }) => {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia component="img" width="140" src={caff.file} alt={caff.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {caff.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {caff.uploader}
        </Typography>
      </CardContent>
    </Card>
  );
};
