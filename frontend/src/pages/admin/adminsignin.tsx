import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../constants/theme";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Alert, Snackbar } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useStore } from "../../stores";
import { useNavigate } from "react-router-dom";

export function AdminSignIn() {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (userStore.isLoggedIn) navigate("/admin");
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && password)
      userStore.login(email, password).then(() => {
        if (!userStore.isAdmin) setEmailError("You are not an admin");
        else navigate("/admin");
      });
    else if (!email) setEmailError("Email is missing");
    if (!password) setPasswordError("Password or RePassword is missing");
  };

  const resetPassword = () => {
    if (email)
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setOpen(true);
        })
        .catch((error) => {
          console.log(error.message);
        });
    else if (!email) setEmailError("Email is missing");
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError ? true : false}
              helperText={emailError ? emailError : ""}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("");
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              error={passwordError ? true : false}
              helperText={passwordError ? passwordError : ""}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError("");
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" component="button" onClick={resetPassword}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
          >
            <Alert
              onClose={() => setOpen(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
