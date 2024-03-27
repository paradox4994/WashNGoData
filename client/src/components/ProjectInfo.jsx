import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

export default function ProjectInfo() {

  const [tempList, setTempList] = useState([]);

  const [data, setData] = useState({
    name: '',
    description: '',
    tag: '',
    template: {}
  })

  const [saved,setSaved] = useState(false)

  const saveInfo = async(e) => {
    const {name, description, tag, template} = data

    if(data.name === ''){
        toast.error("Name cannot be empty")
        return
      }

      if(data.description === ''){
        toast.error("Description cannot be empty")
        return
      }

      if(data.tag === ''){
        toast.error("Tag cannot be empty")
        return
      }

      try {

        const user = await axios.get("/profile");

        const {data} = await axios.post('/project/saveproject',{
          name, description, tag, templateID: template, userId: user.data.id,
        })
        if(data.error){
          toast.error(data.error)
        }else{
          toast.success('Project Saved')
          setSaved(true)
        }
      } catch (error) {
        console.log(error)
      }
    }

  const handleChange = (e) => {
    setData({ ...data, template: e.target.value })
  };

  useEffect(() => {
    LoadTemplate();
  }, []);

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
          disabled={saved}
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
          disabled={saved}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <TextField
          id="outlined-required"
          label="Tag"
          name="tagname"
          disabled={saved}
          sx={{ mt: 3 }}
          value={data.tag}
          onChange={(e) => setData({ ...data, tag: e.target.value })}
        />
        <FormControl sx={{ mt: 3 }}>
          <InputLabel id="template-select-label">Template</InputLabel>
          <Select
            labelId="template-select-label"
            id="template-select"
            defaultValue=""
            disabled={saved}
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
        <Button sx={{ mt: 3 }} disabled={saved} variant="outlined" onClick={saveInfo}>Save</Button>
      </Box>
    </>
  );
}
