import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ColumnComponent from "../../components/ColumnComponent";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//MUI Imports
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ViewTemplate() {
  const location = useLocation();
  const navigate = useNavigate();

  const [columnComponents, setColumnComponents] = useState([
    { fieldValue: "", description: "", unit: "" },
  ]);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    axios
      .post("/template/viewtemplate", { id: location.state.userId })
      .then((res) => {
        setProjectName(res.data.template.name);
        setProjectDescription(res.data.template.description);
        setColumnComponents(res.data.template.columns);
      });
  }, []);

  const onAddButtonClick = () => {
    setColumnComponents([
      ...columnComponents,
      { fieldValue: "", description: "", unit: "" },
    ]);
  };

  const onResetButtonClick = () => {
    axios
      .post("/template/viewtemplate", { id: location.state.userId })
      .then((res) => {
        setProjectName(res.data.template.name);
        setProjectDescription(res.data.template.description);
        setColumnComponents(res.data.template.columns);
      });
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

  const onUpdateButtonClick = async () => {
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
        id: location.state.userId,
        name: projectName,
        description: projectDescription,
        userId: user.data.id,
        columns: columnComponents,
      };

      await axios
        .post("/template/updatetemplate", data)
        .then(
          toast.success("Template Updated"),
          navigate("/dashboard", { state: { pageNumber: 2 } })
        );
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
            my: 3,
            width: "25%",
          }}
        >
          <Typography variant="h4" sx={{ mt: 3 }}>
            Edit Template
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
            InputProps={{
              readOnly: true,
            }}
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
              onClick={onUpdateButtonClick}
            >
              Update
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
