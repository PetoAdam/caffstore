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
import { theme } from "../constants/theme";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useStore } from "../stores";
import { useNavigate } from "react-router-dom";
import { httpService } from "../services/httpService";

export function SignUp() {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (userStore.isLoggedIn) navigate("/");
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && password === rePassword && password)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
          const user = userCredential.user;
          httpService.accessToken = userCredential.user.accessToken
          setDoc(doc(db, "users", user.uid), {
            email: user.email,
            username: user.email,
            isAdmin: false,
            uid: user.uid,
          }).then(() => {
            //userStore.setIsLoggedIn(true);
            navigate("/");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    else if (!email) setEmailError("Email is missing");
    if (!password || !rePassword)
      setPasswordError("Password or RePassword is missing");
    if (password !== rePassword)
      setPasswordError("Password and RePassword do not match");
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError ? true : false}
                  helperText={emailError ? emailError : ""}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError("");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  error={passwordError ? true : false}
                  helperText={passwordError ? passwordError : ""}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError("");
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError ? true : false}
                  required
                  fullWidth
                  name="repassword"
                  label="Password again"
                  type="password"
                  autoComplete="new-password"
                  helperText={passwordError ? passwordError : ""}
                  value={rePassword}
                  onChange={(event) => {
                    setRePassword(event.target.value);
                    setPasswordError("");
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
