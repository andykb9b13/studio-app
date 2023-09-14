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
import { useTeacherContext } from "../../utils/Context";
import { useStudentContext } from "../../utils/Context";

export default function Navbar() {
  const { student } = useStudentContext();
  const { teacher } = useTeacherContext();

  console.log("student", student);
  console.log("teacher", teacher);

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
              {/* <MenuItem onClick={() => window.location.assign("/tutor")}>
                Virtual Tutor
              </MenuItem>
              <MenuItem onClick={() => window.location.assign(`/teacher/:id`)}>
                Resources
              </MenuItem> */}
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
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
            </React.Fragment>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                variant="outlined"
                sx={{ mx: 2 }}
              >
                Teacher Login
              </Button>
              <Button
                component={Link}
                to="/studentLogin"
                color="inherit"
                variant="outlined"
                sx={{ mx: 2 }}
              >
                Student Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
