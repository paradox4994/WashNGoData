import {React, useState, useContext, useEffect} from "react";
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { TableContext } from "../../context/tableContext";

export default function TableComp() {

  const {data, setData} = useContext(TableContext)

  return (
    <Box sx={{  height: "70vh", mt: 3,  width: '100%' }}>
      <DataGrid
        rows={data.rows}
        columns={data.columns}
        disableRowSelectionOnClick
        columnVisibilityModel={{
          id: true
        }}
      />
    </Box>
  );
}
