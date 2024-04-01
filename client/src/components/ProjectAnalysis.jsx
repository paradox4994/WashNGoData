import React from "react";
import { Box, ToggleButtonGroup, ToggleButton, Container, Typography } from "@mui/material";
import BarChartComp from "./charts/BarChartComp";
import LineChartComp from "./charts/LineChartComp";
import PieChartComp from "./charts/PieChartComp";
import { TableContext } from "../../context/tableContext";
import { useContext } from "react";
;

export default function ProjectAnalysis() {

  const {data} = useContext(TableContext)

  const [alignment, setAlignment] = React.useState(data.chart);

  const handleToggleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Box sx={{ display: "flex", mt: 3 }}>
        <Typography variant="h4">{data.name}</Typography>
      </Box>
      <Box sx={{mt: 9, display:"flex"}}>
        {alignment === "Bar Chart" && <BarChartComp />}
        {alignment === "Line Chart" && <LineChartComp />}
        {alignment === "Pie Chart" && <PieChartComp />}
      </Box>
    </>
  );
}
