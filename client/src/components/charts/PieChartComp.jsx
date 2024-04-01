import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Slider, Typography, TextField } from "@mui/material";
import { useContext } from "react";
import { TableContext } from "../../../context/tableContext";

export default function PieChartComp() {
  const { data } = useContext(TableContext);
  const [ir, setir] = useState(0);
  const [pa, setpa] = useState(0);
  const [cr, setcr] = useState(0);

  const handleirchange = (event, newValue) => {
    setir(newValue);
  };

  const handlepachange = (event, newValue) => {
    setpa(newValue);
  };

  const handlecrchange = (event, newValue) => {
    setcr(newValue);
  };

  return (
    <>
    <Box>
      <PieChart
        series={[
          {
            data: data.rows,
            innerRadius: ir,
            paddingAngle: pa,
            cornerRadius: cr,
          },
        ]}
        width={700}
        height={400}
      />
    </Box>
    <Box>
    <Box sx={{width:"100%"}}>
      <Typography>Inner Radius:</Typography>
      <Slider value={ir} valueLabelDisplay="auto" onChange={handleirchange} />
      <Typography>Padding Angle:</Typography>
      <Slider value={pa} valueLabelDisplay="auto" onChange={handlepachange} />
      <Typography>Corner Radius:</Typography>
      <Slider value={cr} valueLabelDisplay="auto" onChange={handlecrchange} />
    </Box>
    <Box>
        <TextField
          id="outlined-required"
          label="Tag"
          name="tagname"
          sx={{ mt: 3 }}
          value={data.tag}
        />
        <Box></Box>
        <TextField
          id="outlined-required"
          label="template"
          name="template"
          sx={{ mt: 3 }}
          value={data.template}
        />
        </Box>
        </Box>
    </>
  );
}
