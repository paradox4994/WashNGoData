import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import axios from 'axios';

// Materials Import
import { Button, Container, Box, Stack, Typography } from "@mui/material";

// MUI Icons
import AddIcon from "@mui/icons-material/Add";


export default function Templates() {

  const navigate = useNavigate()

  const [template, setTemplate] = useState([])

useEffect(() => {
  LoadTemplate();
}, [template]);

async function LoadTemplate() {
  try {

    const resp = await axios.get("/profile")
    const user = {"userID" : resp.data.id}

    const res = await axios.post("/template",user);
    setTemplate(res.data);
  } catch (error) {
    console.log(error);
  }
}

  const AddTemplate = async () => {
    navigate('/newtemplate')
  };

  const onViewClicked = (id) => {
    navigate('/viewtemplate',{
      state: {
        userId: id,
      }
    })
  }

  const onDeleteClicked = async (id) => {
    try {
      const res = await axios.post('/template/deletetemplate',{"id":id})
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Stack direction="row">
        <Typography variant="h4" sx={{px: 2, mt: 1}}>Templates</Typography>
        <Box sx={{ml: "auto", px: 2, mt: 1}}>
          <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={AddTemplate}>
            Templates
          </Button>
        </Box>
      </Stack>
      <Stack spacing={2} sx={{ px: 2, mt: 2 }}>
        {template.length == 0?(
          <Typography variant='h7' sx={{display: "flex", justifyContent:"center", alignContent: "center"}}>No Templates Found</Typography>
        ):(
          template.map((item) => (
            <Box
              key={item._id}
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
  )
}
