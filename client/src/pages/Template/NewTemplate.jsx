import React, { useEffect, useState } from "react";
import ColumnComponent from "../../components/ColumnComponent";
import {toast} from 'react-hot-toast'

//MUI Imports
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export default function NewTemplate() {
  const [columnComponents, setColumnComponents] = useState([
    { fieldValue: "", description: "", unit: "" },
  ]);

  const [projectName, setProjectName] = useState("")
  const [projectDiscription, setProjectDiscription] = useState("")

  const onAddButtonClick = () => {
    setColumnComponents([
      ...columnComponents,
      { fieldValue: "", description: "", unit: "" },
    ]);
  };

  const onResetButtonClick = () => {
    setColumnComponents([{ fieldValue: "", description: "", unit: "" }]);
    setProjectName("")
    setProjectDiscription("")
  };

  const handleFormChange = (index, e) => {
    let data = [...columnComponents];
    data[index][e.target.name] = e.target.value;
    setColumnComponents(data);
  };

  const removeFields = (index) => {
    let data = [...columnComponents]
    data.splice(index, 1)
    setColumnComponents(data);
  }

  const onSaveButtonClick = async () => {
    if(projectName === ""){
      toast.error("Project name cannot be empty")
      return
    }
    if(projectDiscription === ""){
      toast.error("Project discription cannot be empty")
      return
    }
    try {
      const user = await axios.get("/profile")

      const data = {
        "name": projectName,
        "description": projectDiscription,
        "userId": user.data.id,
        "columns": columnComponents 
      }

      await axios.post('/template/savetemplate',data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Stack direction="row">
        <Container
          component="div"
          sx={{
            borderRadius: 3,
            boxShadow: 5,
            ml: 2,
            my: 3,
            width: "25%",
          }}
        >
          <Typography variant="h4" sx={{ mt: 3 }}>
            Create Template
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="outlined-required"
            label="Name"
            name="projectName"
            sx={{ mt: 3 }}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="outlined-multiline-static"
            multiline
            label="Discription"
            name="discription"
            rows={4}
            sx={{ mt: 3, mb: 3 }}
            value={projectDiscription}
            onChange={(e) => setProjectDiscription(e.target.value)}
          />
          <Container sx={{ mb: 3 }} component="div">
            <Button
              variant="contained"
              sx={{ mr: 3 }}
              color="error"
              onClick={onResetButtonClick}
            >
              Reset
            </Button>
            <Button variant="contained" color="success" onClick={onSaveButtonClick}>
              Save
            </Button>
          </Container>
        </Container>
        <Container
          component="div"
          sx={{
            minHeight: "100%",
            borderRadius: 3,
            boxShadow: 5,
            mx: 2,
            my: 3,
          }}
        >
          {columnComponents.map((column, index) => (
            <ColumnComponent
              key={index}
              vals={column}
              handleFormChange={handleFormChange}
              index={index}
              removeFields={removeFields}
            />
          ))}
          <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              startIcon={<AddIcon />}
              onClick={onAddButtonClick}
            >
              Add
            </Button>
          </Container>
        </Container>
      </Stack>
    </>
  );
}
