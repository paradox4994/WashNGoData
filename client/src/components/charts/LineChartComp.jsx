import React, { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Switch, Typography, TextField } from "@mui/material";
import { TableContext } from "../../../context/tableContext";
import { useContext } from "react";

export default function LineChartComp() {

  const [area, setArea] = useState(false);

  const {data} = useContext(TableContext)

  return (
    <>
      <Box>
        <LineChart
          xAxis={[{ scaleType: 'point', data: data.rows[0] }]}
          series={[
            {
              data: data.rows[1],
              area: area,
            },
          ]}
          width={850}
          height={400}
        />
      </Box>
      <Box>
        <Switch
          checked={area}
          onChange={() => {setArea(!area)}}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography>Area</Typography>
      <Box>
        <TextField
          id="outlined-required"
          label="Tag"
          name="tagname"
          sx={{ mt: 3 }}
          value={data.tag}
        />
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
