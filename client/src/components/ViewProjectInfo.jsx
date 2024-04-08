import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { TableContext } from "../../context/tableContext";

// MUI Imports
import {
  TextField,
  Typography,
  Box,
} from "@mui/material";

export default function ViewProjectInfo() {

    const location = useLocation();

  const {data, setData} = useContext(TableContext)

  const loadData = async() => {
    const res = await axios.post("/project/viewproject", { id: location.state.userId })
    const templateRes = await axios.post("/template/viewtemplate",{id:res.data.project.templateID})

    setData({
        name: res.data.project.name,
        description: res.data.project.description,
        tag: res.data.project.tag,
        chart: res.data.project.chart,
        template: templateRes.data.template.name,
        rows: res.data.project.rows,
        columns: templateRes.data.template.columns,
    })
  }

  useEffect(() => {
    if(data.name === ""){
        loadData()
    }
  }, []);

  const [tempList, setTempList] = useState([]);

  return (
    <>
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
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          name="description"
          multiline
          rows={3}
          sx={{ mt: 3 }}
          value={data.description}
        />
        <TextField
          id="outlined-required"
          label="Tag"
          name="tagname"
          sx={{ mt: 3 }}
          value={data.tag}
        />
        <TextField
          id="outlined-required"
          label="Template"
          name="template"
          sx={{ mt: 3 }}
          value={data.template}
        />
      </Box>
    </>
  );
}
