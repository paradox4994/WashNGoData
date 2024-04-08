import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


// MUI Imports
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export default function ProjectInfo() {

  const navigate = useNavigate()

  const [tempList, setTempList] = useState([]);

  const chartList = ["Bar Chart", "Line Chart", "Pie Chart"]

  const [data, setData] = useState({
    name: "",
    description: "",
    tag: "",
    chart: "",
    template: {},
    file: "",
  });

  const [disabled, setDisabled] = useState(true);

  const saveInfo = async (e) => {
    if (data.name === "") {
      toast.error("Name cannot be empty");
      return;
    }

    if (data.description === "") {
      toast.error("Description cannot be empty");
      return;
    }

    if (data.tag === "") {
      toast.error("Tag cannot be empty");
      return;
    }

    try {
      const user = await axios.get("/profile");

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("tag", data.tag);
      formData.append("chart",data.chart);
      formData.append("templateID", data.template);
      formData.append("userId", user.data.id);
      formData.append("file", data.file);

      const resp = await axios.post("/project/saveproject", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (resp.data.error) {
        toast.error(resp.data.error);
      } else {
        toast.success("Project Saved");
        navigate("/dashboard", { state: { pageNumber: 1 } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, template: e.target.value });
  };

  const handleChartChange = (e) => {
    setData({ ...data, chart: e.target.value });
  };

  const handleUpload = (e) => {
    setData({ ...data, file: e.target.files[0] });
  };

  useEffect(() => {
    LoadTemplate();
  }, []);

  useEffect(() => {
    if (
      data.name &&
      data.description &&
      data.tag &&
      data.chart &&
      data.template &&
      data.file
    ) {
      setDisabled(false);
    }
  }, [data]);

  async function LoadTemplate() {
    try {
      const resp = await axios.get("/profile");
      const user = { userID: resp.data.id };

      const res = await axios.post("/template", user);
      setTempList(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <Box sx={{ height: "10%" }}></Box>
      <Typography variant="h4" sx={{ mt: 3 }}>
        Project Information
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column " }}>
        <TextField
          id="outlined-required"
          label="Project Name"
          name="projectname"
          sx={{ mt: 3 }}
          autoFocus
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          name="description"
          multiline
          rows={3}
          sx={{ mt: 3 }}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <Box>
        <TextField
          id="outlined-required"
          label="Tag"
          name="tagname"
          sx={{ mt: 3, width: "40%" }}
          value={data.tag}
          onChange={(e) => setData({ ...data, tag: e.target.value })}
        />
        <FormControl sx={{ mt: 3, ml: 3 , width: "40%" }}>
          <InputLabel id="chart-select-label">Chart</InputLabel>
          <Select
            labelId="chart-select-label"
            id="chart-select"
            defaultValue=""
            value={data.chart}
            label="Chart"
            onChange={handleChartChange}
          >
            {chartList.map((col, index) => (
              <MenuItem value={col} key={index}>
                {col}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
        <FormControl sx={{ mt: 3 }}>
          <InputLabel id="template-select-label">Template</InputLabel>
          <Select
            labelId="template-select-label"
            id="template-select"
            defaultValue=""
            value={data.template}
            label="Template"
            onChange={handleChange}
          >
            {tempList.map((col, index) => (
              <MenuItem value={col._id} key={index}>
                {col.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="file-upload"
          type="file"
          variant="outlined"
          onChange={handleUpload}
          fullWidth
          sx={{ mt: 3 }}
        />
        <Button
          sx={{ mt: 3 }}
          disabled={disabled}
          variant="contained"
          onClick={saveInfo}
        >
          Save
        </Button>
      </Box>
    </>
  );
}
