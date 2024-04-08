import React from "react";
import TableComp from "../../components/TableComp";
import { useState } from "react";
import ViewProjectInfo from '../../components/ViewProjectInfo'

// MUI Imports
import {
  Stack,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// MUI Icons
import TableChartIcon from '@mui/icons-material/TableChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ProjectAnalysis from "../../components/ProjectAnalysis";


export default function VIewProject() {

  const [page, setPage] = useState(1)

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber)
  }

  return (
    <>
    <Stack direction="row">
        <List
          sx={{ borderRadius: 3, boxShadow: 5, ml: 3, mt: 3, width: "15%" }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => handlePageChange(1)}>
              <ListItemIcon>
                <EditNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Project" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handlePageChange(2)}>
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="Data" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handlePageChange(3)}>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Analysis" />
            </ListItemButton>
          </ListItem>
        </List>
        <Container
          component="div"
          sx={{
            minHeight: "80vh",
            width: "100%",
            borderRadius: 3,
            boxShadow: 5,
            mt: 3,
          }}
        >
          {page === 1 && <ViewProjectInfo/>}
          {page === 2 && <TableComp/>}
          {page === 3 && <ProjectAnalysis/>}
        </Container>
      </Stack>
  </>
  )
}
