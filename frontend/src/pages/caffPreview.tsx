import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../stores";

import { Caff } from "../types/Caff";
import ErrorPage from "./error";

export const CaffPreview = () => {
  const { id } = useParams();
  const { caffStore } = useStore();

  const caff = caffStore.getCaffById(parseInt(id!));

  if (caff)
    return (
      <Box
        sx={{
          display: "flex",
          padding: 10,
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: "70%" }}>
          <Box sx={{ display: "flex", flexDirection: "row", padding: 10 }}>
            <CardMedia
              component="img"
              sx={{ width: 500 }}
              src={caff.file}
              alt={caff.name}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                paddingTop: 5,
              }}
            >
              <Typography gutterBottom variant="h1" component="div">
                {caff.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  paddingLeft: 10,
                  paddingTop: 10,
                }}
              >
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ paddingRight: 2 }}
                >
                  Uploader:
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  {caff.uploader}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  paddingLeft: 10,
                }}
              >
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{ paddingRight: 2 }}
                >
                  Upload date:
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  {caff.date.split("T")[0]}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    );
  else return <ErrorPage />;
};
