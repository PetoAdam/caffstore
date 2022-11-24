import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import logo from "../assets/logo.png";
import { ThemeProvider } from "@mui/material";
import { theme } from "../constants/theme";
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const AdminAppBar = observer(() => {
  const { userStore } = useStore();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ backgroundColor: "red" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link style={{ textDecoration: "none" }} to="/admin">
              <img src={logo} alt="" style={{ width: 80 }} />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link style={{ textDecoration: "none" }} to={"/admin/users"}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Edit users
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/admin/products"}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Edit products
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Link
                style={{ textDecoration: "none" }}
                to={userStore.isLoggedIn ? "/admin/signout" : "/admin/signin"}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {userStore.isLoggedIn ? "Signout" : "Signin"}
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
});
