import React from 'react'
import { useLocation } from 'react-router-dom'

import { Button, Container, Box, Stack, Typography } from "@mui/material";


export default function AdminProjects() {
    const location = useLocation();

    const projects = location.state.projects
    const proj1 = Object.entries(projects)[0]
    const proj = proj1.shift()
    return (
        <>
          <Stack direction="row">
            <Typography variant="h4" sx={{ px: 2, mt: 1 }}>
              Users
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ px: 2, mt: 2 }}>
            {proj.length == 0 ? (
              <Typography
                variant="h7"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                No Projects Found
              </Typography>
            ) : (
                proj.map((item) => (
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
                    </Container>
                    <Box sx={{ p: 2 }}>
                    </Box>
                    <Box sx={{ p: 2 }}>
                    </Box>
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        </>
      );
}
