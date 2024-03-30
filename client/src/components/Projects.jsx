import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

// Materials Import
import { Button, Container, Box, Stack, Typography } from "@mui/material";

// MUI Icons
import AddIcon from "@mui/icons-material/Add";

export default function Projects() {

  const navigate = useNavigate();

  const [project,setProject] = useState([])

  useEffect(() => {
    LoadProjects()
  },[project])

  async function LoadProjects() {
    try {
      const resp = await axios.get("/profile")
      const user = {"userID" : resp.data.id}
      const res = await axios.post("/project",user);
      setProject(res.data);
    } catch(error){
      console.log(error)
    }
  }

  const onDeleteClicked = async (id) => {
    try {
      const res = await axios.post('/project/deleteproject',{"id":id})
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const onViewClicked = async (id) => {
    navigate('/viewproject',{
      state: {
        userId: id,
      }
    })
  }

  return (
    <>
      <Stack direction="row">
        <Typography variant="h4" sx={{px: 2, mt: 1}}>Projects</Typography>
        <Box sx={{ml: "auto", px: 2, mt: 1}}>
          <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => {navigate('/newproject')}}>
            Projects
          </Button>
        </Box>
      </Stack>
      <Stack spacing={2} sx={{ px: 2, mt: 2 }}>
        {project.length == 0?(
          <Typography variant='h7' sx={{display: "flex", justifyContent:"center", alignContent: "center"}}>No Projects Found</Typography>
        ):(
          project.map((item) => (
            <Box
              key={item.name}
              sx={{
                backgroundColor: "#eaeaea",
                borderRadius: 1.2,
                boxShadow: 1,
                px: 1,
              }}
            >
              <Stack direction="row">
                <Container>
                  <Typography variant="h5" sx={{ p: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ px: 1, pb: 1 }}>{item.createdAt.slice(0,10)}</Typography>
                </Container>
                <Box sx={{ p: 2 }}>
                  <Button variant="contained" onClick={() => {onViewClicked(item._id)}}>View</Button>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Button variant="outlined" color="error" onClick={() => {onDeleteClicked(item._id)}}>
                    Delete
                  </Button>
                </Box>
              </Stack>
            </Box>
          ))
        )}
      </Stack>
    </>
  );
}
