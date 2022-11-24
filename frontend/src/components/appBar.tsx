import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import logo from "../assets/logo.png";
import { ThemeProvider } from "@mui/material";
import { Pages } from "../constants/pages";
import { theme } from "../constants/theme";
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const pages = [Pages.products, Pages.upload];
const settingsWithoutLogin = [Pages.signin, Pages.signup];
const settingsWithLogin = [Pages.cart, Pages.logout];

export const CustomerAppBar = observer(() => {
  const { userStore } = useStore();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ backgroundColor: "green" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link style={{ textDecoration: "none" }} to="/">
              <img src={logo} alt="" style={{ width: 80 }} />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/${page.toLowerCase()}`}
                  key={page}
                >
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, flexDirection: "row", display: "flex" }}>
              {!userStore.isLoggedIn &&
                settingsWithoutLogin.map((setting) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/${setting.toLowerCase()}`}
                    key={setting}
                  >
                    <Button sx={{ my: 2, color: "white", display: "block" }}>
                      {setting}
                    </Button>
                  </Link>
                ))}

              {userStore.isLoggedIn &&
                settingsWithLogin.map((setting) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/${setting.toLowerCase()}`}
                    key={setting}
                  >
                    <Button sx={{ my: 2, color: "white", display: "block" }}>
                      {setting}
                    </Button>
                  </Link>
                ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
});
