import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentComponent } from "../components/commentComponent";
import { useStore } from "../stores";
import { Comment } from "../types/Caff";
import { commentService } from "../services/commentService";
import ErrorPage from "./error";
import { caffService } from "../services/caffService";

export const CaffPreview = observer(() => {
  const { id } = useParams();
  const { caffStore, userStore } = useStore();

  const [caff, setCaff] = useState(caffStore.getCaffById(parseInt(id!)));

  const [disabled, setDisabled] = useState(false);

  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");

  const onComment = async () => {
    if (comment == "") {
      setCommentError("Before posting you have to write something!");
    } else {
      setDisabled(true);
      setCommentError("");
      //todo - addComment - check this with backend
      if (caff != undefined) {
        const newComment = {
          userId: String(userStore.user?.uid),
          text: comment,
          caffId: caff?.id,
        };
        console.log(newComment);
        await commentService.addComment(newComment);
        setComment("");
        setCaff(await caffService.getCaffById(parseInt(id!)));
        caffStore.getCaffs();
      }
      setDisabled(false);
    }
  };

  if (caff)
    return (
      <Box
        sx={{
          display: "flex",
          padding: 10,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Card sx={{ width: "70%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: 10,
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              src={caff.file}
              alt={caff.name}
              sx={{ height: 200, width: "auto" }}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                paddingTop: 5,
              }}
            >
              <Typography gutterBottom variant="h3" component="div">
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
                  variant="h5"
                  component="div"
                  sx={{ paddingRight: 2 }}
                >
                  Uploader:
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
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
                  variant="h5"
                  component="div"
                  sx={{ paddingRight: 2 }}
                >
                  Upload date:
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {String(caff.creationDate).split("T")[0]}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </Card>
        <Typography variant="h2" sx={{ paddingTop: 20 }}>
          Comments
        </Typography>
        <Paper style={{ padding: "40px 20px", width: "70%" }}>
          {caff.comments?.map((comment, index) => (
            <Box key={"comment" + index}>
              <CommentComponent comment={comment} />
              {index + 1 !== caff.comments?.length && (
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
              )}
            </Box>
          ))}
        </Paper>
        <Paper style={{ padding: "40px 20px", width: "70%", marginTop: 20 }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid
              justifyContent="left"
              item
              xs
              zeroMinWidth
              sx={{ flexDirection: "column", display: "flex" }}
            >
              <Typography variant="h4" sx={{ margin: 0, textAlign: "left" }}>
                What are your thoughts?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  margin: 0,
                  textAlign: "left",
                  paddingTop: 3,
                  paddingBottom: 3,
                }}
              >
                {userStore.user?.username}
              </Typography>
              <TextField
                multiline
                minRows={5}
                value={comment}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setComment(event.target.value);
                }}
                sx={{ textAlign: "left" }}
              ></TextField>
              {commentError != "" && (
                <p style={{ color: "#FF0000" }}>{commentError}</p>
              )}
            </Grid>
          </Grid>
        </Paper>
        <Box
          sx={{
            marginTop: 5,
            width: "70%",
            textAlign: "right",
          }}
        >
          <Button variant="contained" onClick={onComment} disabled={disabled}>
            Comment
          </Button>
        </Box>
      </Box>
    );
  else return <ErrorPage />;
});
