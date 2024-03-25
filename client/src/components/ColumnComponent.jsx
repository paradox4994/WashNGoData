import React, { useState } from "react";

import { Button, Container, TextField } from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


export default function ColumnComponent ({vals, handleFormChange,index,removeFields}) {

    return (
      <Container
        component="div"
        sx={{
          minHeight: "25%",
          borderRadius: 3,
          boxShadow: 3,
          mx: 0,
          mt: 3,
        }}
      >
        <TextField
          margin="normal"
          id="outlined-required"
          label="Field Name"
          name="fieldValue"
          sx={{mb: 2}}
          value={vals.fieldValue}
          onChange={(e) => handleFormChange(index,e)}
        />
        <TextField
          margin="normal"
          id="outlined-multiline-flexible"
          label="Description"
          name="description"
          multiline
          maxRows={1}
          sx={{mb: 2, ml: 3}}
          value={vals.description}
          onChange={(e) => handleFormChange(index,e)}
        />
        <TextField
          margin="normal"
          id="outlined-required"
          label="Unit"
          name="unit"
          sx={{mb: 2, ml: 3}}
          value={vals.unit}
          onChange={(e) => handleFormChange(index,e)}
        />
        <Button variant="outlined" color="error" startIcon={<DeleteForeverRoundedIcon/>} sx={{ml: 3, mt: 3} } onClick={() => removeFields(index)}>Delete</Button>
      </Container>
    );
  };