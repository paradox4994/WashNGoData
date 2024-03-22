import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";

// MUI Imports
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

const pages = ["Products", "Pricing", "Blog"];

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  };

  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            ml: 1,
          }}
        >
          <IconButton
            onClick={() => {
              navigate("/");
            }}
          >
            <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                borderRadius: 2,
              }}
              alt="Logo"
              src="/logo.png"
            />
          </IconButton>
          <Typography variant="h5">Wash N Go</Typography>
          <Button
            variant="text"
            sx={{ color: "inherit", pl: 4 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography>Home</Typography>
          </Button>
          <Button variant="text" sx={{ color: "inherit" }}>
            <Typography>About</Typography>
          </Button>
          <Button variant="text" sx={{ color: "inherit" }}>
            <Typography>Contact</Typography>
          </Button>
          {user ? (
            <>
              <Button
                variant="text"
                sx={{ color: "inherit", mr: 0, pr: 0 }}
                onClick={() => navigate("/dashboard")}
              >
                <Typography>Dashboard</Typography>
              </Button>
              <Button
                sx={{ color: "inherit", ml: 0, pl: 0 }}
                size="small"
                disableRipple
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <ArrowDropDownRoundedIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => navigate("/dashboard",{
                  state:{
                    pageNumber: 1
                  }
                })}>Projects</MenuItem>
                <MenuItem onClick={() => navigate("/dashboard",{
                  state:{
                    pageNumber: 2
                  }
                })}>Templates</MenuItem>
                <MenuItem onClick={() => navigate("/dashboard",{
                  state:{
                    pageNumber: 3
                  }
                })}>Default Templates</MenuItem>
              </Menu>
            </>
          ) : null}
        </Container>
        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
          {user && user.role === "admin" ? (
            <Button variant="contained" color="warning" sx={{ mx: 1 }}>
              Admin
            </Button>
          ) : null}
          {user ? (
            <Button
              variant="contained"
              color="success"
              sx={{ mx: 1 }}
              onClick={logoutUser}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="success"
                sx={{ mx: 1 }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ mx: 1 }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign up
              </Button>
            </>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
}

{
  /* <div>
      <Link to='/'>Home</Link>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </div> */
}
