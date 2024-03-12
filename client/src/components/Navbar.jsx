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
} from "@mui/material";

const pages = ["Products", "Pricing", "Blog"];

export default function Navbar() {

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate()

  const logoutUser = () => {
    setUser(null)
    navigate('/login')
  }

  return (
      <AppBar position="static">
        <Toolbar>
          <Container sx={{display: "flex", justifyContent: "flex-start", alignItems: "center", ml: 1}}>
            <IconButton onClick={() => {navigate('/')}}>
              <Box component="img" sx={{
                height: 50,
                width: 50,
                borderRadius: 2
              }}
              alt="Logo"
              src="/logo.png"
              />
            </IconButton>
            <Typography variant="h5">
              Wash N Go
            </Typography>
            <Button variant="text" sx={{color:"inherit", pl: 4}} onClick={() => {navigate('/')}}>
            <Typography>
              Home
            </Typography>
            </Button>
            <Button variant="text" sx={{color:"inherit"}}>
            <Typography>
              About
            </Typography>
            </Button>
            <Button variant="text" sx={{color:"inherit"}}>
            <Typography>
              Contact
            </Typography>
            </Button>
          </Container>
          <Container sx={{display: "flex", justifyContent: "flex-end"}}>
            {user && user.role === "admin"?(
              <Button variant="contained" color="warning" sx={{mx: 1}}>
                Admin
              </Button>
            ):(null)}
            {user?(
              <Button variant="contained" color="success" sx={{mx: 1}} onClick={logoutUser}>
              Logout
            </Button>
            ):(<>
              <Button variant="contained" color="success" sx={{mx: 1}} onClick={() => {navigate('/login')}}>
              Login
            </Button>
            <Button variant="contained" color='error' sx={{mx: 1}} onClick={() => {navigate('/register')}}>
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
