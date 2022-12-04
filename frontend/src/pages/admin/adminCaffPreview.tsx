import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  darken,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CommentComponent } from "../../components/commentComponent";
import { useStore } from "../../stores";
import ErrorPage from "../error";

export const AdminCaffPreview = observer(() => {
  const { id } = useParams();
  const { caffStore, userStore } = useStore();
  const caff = caffStore.getCaffById(parseInt(id!));

  const [caffName, setCaffName] = useState(caff?.name);
  const [caffUploader, setCaffUploader] = useState(caff?.uploader);

  const onDeleteComment = async (id: number) => {
    //TODO - delete comment - check with backend
    let deletedComment = await commentService.deleteComment(id)
    console.log(deletedComment)
  };

  const deleteCaff = async () => {
    //TODO - delete caff - chack with backend
    if (caff != undefined) {
      let deletedCaff = await caffService.deleteCaff(caff.id)
    }
  }

  const modifyCaff = async () => {
    //TODO - modify caff - check with backend
    if (caff != undefined && caffName != undefined && caffUploader != undefined) {
      let newCaff: Caff = {
        id: 0,
        name: caffName,
        creationDate: caff?.creationDate,
        file: caff?.file,
        uploader: caffUploader,
        comments: caff?.comments,
        uploaderId: caff?.uploaderId
      }
      let modifiedCaff = await caffService.modifyCaff(caff?.id, newCaff)
      console.log(modifiedCaff)
    }
  };

  const handleCaffNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaffName(event.target.value);
  };

  const handleCaffUploaderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCaffUploader(event.target.value);
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
                paddingLeft: 10,
              }}
            >
              <TextField
                defaultValue={caffName}
                size="small"
                sx={rowStyle}
                label="Name"
                onChange={handleCaffNameChange}
              />
              <TextField
                defaultValue={caffUploader}
                size="small"
                sx={rowStyle}
                label="Uploader name"
                onChange={handleCaffUploaderChange}
              />
              <TextField
                defaultValue={caff.date.split("T")[0]}
                size="small"
                sx={rowStyle}
                label="Upload date"
                disabled
              />
              <Box
                sx={{
                  flexDirection: "row",
                  width: "70%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                    "&:hover": {
                      backgroundColor: darken("#ff0000", 0.3),
                    },
                  }}
                  onClick={onDelete}
                >
                  Delete
                </Button>
                <Button variant="contained" onClick={onSave}>
                  Save
                </Button>
              </Box>
            </CardContent>
          </Box>
        </Card>
        <Typography variant="h2" sx={{ paddingTop: 20 }}>
          Comments
        </Typography>
        <Paper style={{ padding: "40px 20px", width: "70%" }}>
          {caff.comments?.map((comment, index) => (
            <Box
              key={"comment" + index}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Button
                variant="contained"
                sx={{
                  marginLeft: 2,
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: darken("#ff0000", 0.3),
                  },
                  width: 100,
                  alignSelf: "flex-end",
                }}
                onClick={() => onDeleteComment(comment.id)}
              >
                Delete
              </Button>
              <CommentComponent comment={comment} />
              {index + 1 !== caff.comments?.length && (
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
              )}
            </Box>
          ))}
        </Paper>
      </Box>
    );
  else return <ErrorPage />;
});

const rowStyle = {
  width: "70%",
  marginBottom: 5,
};
