import React from "react";
import { Typography, Slider, Box, TextField } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { TableContext } from "../../../context/tableContext";
import { useContext } from "react";

export default function BarChartComp() {
  const [seriesNb, setSeriesNb] = React.useState(2);
  const [itemNb, setItemNb] = React.useState(5);

  const {data} = useContext(TableContext)

  const rows = data.rows

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setItemNb(newValue);
  };
  const handleSeriesNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setSeriesNb(newValue);
  };

  const highlightScope = {
    highlighted: 'series',
    faded: 'global',
  };
  
  const series = rows.map((s) => ({ ...s, highlightScope }));

  return (
    <>
      <Box>
        <BarChart
          series={series
            .slice(0, seriesNb)
            .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
          width={700}
          height={400}
        />
      </Box>
      <Box sx={{width: "100%"}}>
        <Typography id="input-item-number" gutterBottom>
          Number of items
        </Typography>
        <Slider
          value={itemNb}
          onChange={handleItemNbChange}
          valueLabelDisplay="auto"
          min={1}
          max={20}
          aria-labelledby="input-item-number"
        />
        <Typography id="input-series-number" gutterBottom>
          Number of series
        </Typography>
        <Slider
          value={seriesNb}
          onChange={handleSeriesNbChange}
          valueLabelDisplay="auto"
          min={1}
          max={10}
          aria-labelledby="input-series-number"
        />
        <Box>
        <TextField
          id="outlined-required"
          label="Tag"
          name="tagname"
          sx={{ mt: 3 }}
          value={data.tag}
        />
        </Box>
        <TextField
          id="outlined-required"
          label="template"
          name="template"
          sx={{ mt: 3 }}
          value={data.template}
        />
      </Box>
    </>
  );
}