import React from 'react'

// Materials Import
import { Button, Container, Box, Stack, Typography } from "@mui/material";

// MUI Icons
import AddIcon from "@mui/icons-material/Add";

export default function TemplateStore() {

  const items = [
    { name: "Default Template 1", date: "1/1/2024" },
    { name: "Default Template 2", date: "11/11/2024" },
    { name: "Default Template 3", date: "99/99/9999" },
    { name: "Default Template 4", date: "1/1/2024" },
  ];

  return (
    <>
      <Stack direction="row">
        <Typography variant="h4" sx={{px: 2, mt: 1}}>Template Store</Typography>
      </Stack>
      <Stack spacing={2} sx={{ px: 2, mt: 2 }}>
        {items.map((item) => (
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
            </Stack>
          </Box>
        ))}
      </Stack>
    </>
  )
}
