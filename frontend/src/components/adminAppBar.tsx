import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";

import logo from "../assets/logo.png";
import { Link, ThemeProvider } from "@mui/material";
import { theme } from "../constants/theme";
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";

export const AdminAppBar = observer(() => {
  const { userStore } = useStore();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ backgroundColor: "red" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/">
              <img src={logo} alt="" style={{ width: 80 }} />
            </Link>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link href={"/admin/users"}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Edit users
                </Button>
              </Link>
              <Link href={"/admin/products"}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Edit products
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Link
                href={userStore.isLoggedIn ? "/admin/signout" : "/admin/signin"}
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
