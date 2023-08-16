import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    Auth.logout();
    alert("You are successfully logged out");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ backgroundColor: "#43bccd" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          {Auth.loggedIn() && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => window.location.assign("/tutor")}>
                Practice Hub
              </MenuItem>
              <MenuItem onClick={() => window.location.assign(`/teacher/:id`)}>
                StudentDatabase
              </MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
              <MenuItem onClick={handleClose}>Delete Account</MenuItem>
            </Menu>
          )}
          {Auth.loggedIn() ? (
            <React.Fragment>
              <Button
                onClick={() => logout()}
                color="inherit"
                variant="outlined"
              >
                Logout
              </Button>
              <Button color="inherit" variant="outlined">
                DeleteAccount
              </Button>
            </React.Fragment>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
              variant="outlined"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
