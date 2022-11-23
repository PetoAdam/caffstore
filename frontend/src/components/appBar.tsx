import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import logo from "../assets/logo.png";
import { ThemeProvider } from "@mui/material";
import { Pages } from "../constants/pages";
import { theme } from "../constants/theme";
import { useStore } from "../stores";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const pages = [Pages.products, Pages.upload];
const settingsWithoutLogin = [Pages.signin, Pages.signup];
const settingsWithLogin = [Pages.profile, Pages.logout];

export const CustomerAppBar = observer(() => {
  const { userStore } = useStore();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

            <Box sx={{ flexGrow: 0 }}>
              <>
                {" "}
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {!userStore.isLoggedIn &&
                    settingsWithoutLogin.map((setting) => (
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/${setting.toLowerCase()}`}
                        key={setting}
                      >
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      </Link>
                    ))}

                  {userStore.isLoggedIn &&
                    settingsWithLogin.map((setting) => (
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/${setting.toLowerCase()}`}
                        key={setting}
                      >
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      </Link>
                    ))}
                </Menu>
              </>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
});
