import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate, Link } from "react-router-dom"

// Material UI imports
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Register() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const registerUser = async (e) =>{
    e.preventDefault()
    const {name, email, password} = data

    if(data.name === ''){
      toast.error("Name cannot be empty")
      return
    }

    if(data.email === ''){
      toast.error("Email cannot be empty")
      return
    }

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

    if(!validateEmail(data.email)){
      toast.error("Invalid Email Address")
      return
    }

    if(data.password === ''){
      toast.error("Password cannot be empty")
      return
    }

    try {
      const {data} = await axios.post('/register',{
        name, email, password
      })
      if(data.error){
        toast.error(data.error)
      }else{
        setData({})
        toast.success('Registration Successful. Welcome!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={registerUser} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="Name"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                value={data.name}
                onChange={(e) => setData({...data,name:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => setData({...data,email:e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={data.password}
                onChange={(e) => setData({...data,password:e.target.value})}
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
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

{/* <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type='text' placeholder='Enter Name...' value={data.name} onChange={(e) => setData({...data,name:e.target.value})}/>
        <label>Email</label>
        <input type='email' placeholder='Enter Email...' value={data.email} onChange={(e) => setData({...data,email:e.target.value})}/>
        <label>Passowrd</label>
        <input type='password' placeholder='Enter Password...' value={data.password} onChange={(e) => setData({...data,password:e.target.value})}/>
        <button type='submit'>Submit</button>
      </form>
    </div> */}