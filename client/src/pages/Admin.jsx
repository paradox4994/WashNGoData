import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Materials Import
import { Button, Container, Box, Stack, Typography } from "@mui/material";

export default function Admin() {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);

  useEffect(() => {
    LoadUsers();
  }, [user]);

  async function LoadUsers() {
    try {
      const resp = await axios.get("/admin");
      setUser(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const onDeleteClicked = async (id) => {
    try {
      const res = await axios.post("/admin/deleteuser", { id: id });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const onViewClicked = async (id) => {
    try {
      const res = await axios.post("/admin/viewproject", { userId: id });
      navigate('/adminproject',{
        state: {
          projects: res.data,
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack direction="row">
        <Typography variant="h4" sx={{ px: 2, mt: 1 }}>
          Users
        </Typography>
      </Stack>
      <Stack spacing={2} sx={{ px: 2, mt: 2 }}>
        {user.length == 0 ? (
          <Typography
            variant="h7"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            No Users Found
          </Typography>
        ) : (
          user.map((item) => (
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
                  <Typography sx={{ px: 1, pb: 1 }}>
                    {item.createdAt.slice(0, 10)}
                  </Typography>
                </Container>
                <Box sx={{ p: 2 }}>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      onDeleteClicked(item._id);
                    }}
                  >
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
