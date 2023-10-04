import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SpaIcon from "@mui/icons-material/Spa";
import colorUpLogo from "../logo100px.png";
import About from "./About";
import { Login } from "@mui/icons-material";
import Register from "../Pages/Register";
import { Link as RouterLink } from "react-router-dom";
import DefaultAvatar from "./DefaultAvatar";

const NavBar = () => {
  const firstName = "Alexandru";
  const lastName = "Vieru";
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const pages = ["Services", "About", "Contact"];
  const settings = ["Profile", "Logout"];

  return (
    <AppBar position="static" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SpaIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Anton",
              fontWeight: 300,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            COLOR UP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    component={RouterLink}
                    to={`/${page.toLocaleLowerCase()}`}
                    sx={{
                      textAlign: "center",
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SpaIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Anton",
              fontWeight: 300,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            COLOR UP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <RouterLink
                key={page}
                to={`/${page.toLowerCase()}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </RouterLink>
            ))}
          </Box>
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <DefaultAvatar firstName={firstName} lastName={lastName} />
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
                {settings.map((setting) =>
                  setting == "Logout" ? (
                    <MenuItem key={setting} onClick={handleLogout}>
                      <Typography
                        component={RouterLink}
                        to={`/`}
                        sx={{
                          textAlign: "center",
                          color: "black",
                          textDecoration: "none",
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        component={RouterLink}
                        to={`/${setting.toLocaleLowerCase()}`}
                        sx={{
                          textAlign: "center",
                          color: "black",
                          textDecoration: "none",
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
          ) : (
            <RouterLink
              key={Login}
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                key={Login}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                LOGIN / REGISTER
              </Button>
            </RouterLink>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
