import React, { useEffect, useState } from "react";
import ColumnComponent from "../../components/ColumnComponent";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//MUI Imports
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


export default function NewTemplate() {
  const navigate = useNavigate();

  const [columnComponents, setColumnComponents] = useState([
    { field: "", description: "", unit: "" },
  ]);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const onAddButtonClick = () => {
    setColumnComponents([
      ...columnComponents,
      { field: "", description: "", unit: "" },
    ]);
  };

  const onResetButtonClick = () => {
    setColumnComponents([{ field: "", description: "", unit: "" }]);
    setProjectName("");
    setProjectDescription("");
  };

  const handleFormChange = (index, e) => {
    let data = [...columnComponents];
    data[index][e.target.name] = e.target.value;
    setColumnComponents(data);
  };

  const removeFields = (index) => {
    let data = [...columnComponents];
    data.splice(index, 1);
    setColumnComponents(data);
  };

  const onSaveButtonClick = async () => {
    if (projectName === "") {
      toast.error("Project name cannot be empty");
      return;
    }
    if (projectDescription === "") {
      toast.error("Project description cannot be empty");
      return;
    }
    try {
      const user = await axios.get("/profile");

      const data = {
        name: projectName,
        description: projectDescription,
        userId: user.data.id,
        columns: columnComponents,
      };

      const res = await axios.post("/template/savetemplate", data);
      if (res.data.error) {
        toast.error(res.data.error);
        return
      }
      toast.success("Template Saved")
      navigate("/dashboard", { state: { pageNumber: 2 } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack direction="row">
        <Container
          component="div"
          sx={{
            borderRadius: 3,
            boxShadow: 5,
            ml: 2,
            mt: 3,
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
            label="Description"
            name="description"
            rows={4}
            sx={{ mt: 3, mb: 3 }}
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
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
            <Button
              variant="contained"
              color="success"
              onClick={onSaveButtonClick}
            >
              Save
            </Button>
          </Container>
        </Container>
        <Container
          component="div"
          sx={{
            minHeight: "80vh",
            borderRadius: 3,
            boxShadow: 5,
            mx: 3,
            mt: 3,
            mb: "auto",
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
              sx={{ mt: 3 , mb: 3}}
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
