import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Comment } from "../types/Caff";

type Props = {
  comment: Comment;
};

export const CommentComponent: React.FC<Props> = ({ comment }) => {
  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: "left" }}>{comment.author}</h4>
        <p style={{ textAlign: "left" }}>{comment.comment}</p>
      </Grid>
    </Grid>
  );
};
