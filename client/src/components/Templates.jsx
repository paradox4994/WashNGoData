import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Materials Import
import { Button, Container, Box, Stack, Typography } from "@mui/material";

// MUI Icons
import AddIcon from "@mui/icons-material/Add";


export default function Templates() {

  const navigate = useNavigate()

  const [template, setTemplate] = useState([])

  const items = [];

useEffect(() => {
  LoadTemplate();
}, [template]);

async function LoadTemplate() {
  try {
    const res = await axios.get("/template");
    setTemplate(res.data);
  } catch (error) {
    console.log(error);
  }
}

  const AddTemplate = async () => {
    navigate('/newTemplate')
  };

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
        {template.map((item) => (
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
                <Typography sx={{ px: 1, pb: 1 }}>{item.date}</Typography>
              </Container>
              <Box sx={{ p: 2 }}>
                <Button variant="contained">View</Button>
              </Box>
              <Box sx={{ p: 2 }}>
                <Button variant="outlined" color="error">
                  Delete
                </Button>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </>
  )
}
