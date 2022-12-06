import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../constants/theme";
import { useStore } from "../stores";
import { useNavigate } from "react-router-dom";
import { Caff } from "../types/Caff";
import { caffService } from "../services/caffService";

export const Upload = () => {
  const { userStore, caffStore } = useStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [caffFile, setCaffFile] = useState("");

  const [nameError, setNameError] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (!userStore.isLoggedIn) navigate("/");
  }, []);

  const getBase64 = (file: File) => {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      let file = event.target.files[0];
      let props = file.name.split(".");
      let extension = props[props.length - 1];
      console.log(extension);
      if (extension.toLowerCase() == "caff") {
        setFileError("");
        getBase64(file)
          .then((result) => {
            console.log(result);

            setCaffFile(result as string);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setFileError("You have to attach a file with 'caff' extension!");
      }
    }
  };

  const uploadCaff = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && fileError == "") {
      let caff: Caff = {
        id: 0,
        name: name,
        creationDate: new Date().toString(),
        file: caffFile,
        uploader: String(userStore.user?.username),
        uploaderId: userStore.user?.uid!,
      };

      const response = (await caffService.addCaff(caff)) as Response;
      console.log(response);

      if (response.status === 201) {
        await caffStore.getCaffs();
        navigate("/products");
      } else if (response.status === 500)
        setFileError("something wen wrong, please try again");
      else setFileError("this is not a valid caff file");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" fontFamily={"sans-serif"}>
            Upload your CAFF file!
          </Typography>
          <form onSubmit={uploadCaff}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name of your CAFF"
              name="name"
              autoFocus
              error={nameError ? true : false}
              helperText={nameError ? nameError : ""}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setNameError("");
              }}
            />
            <input
              type="file"
              accept=".caff"
              required
              onChange={(event) => {
                handleFileChange(event);
              }}
              style={{ marginTop: "10px" }}
            />
            {fileError != "" && <p style={{ color: "#FF0000" }}>{fileError}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Upload your CAFF!
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
