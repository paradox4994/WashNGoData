import React from "react";
import TableComp from "../../components/TableComp";

// MUI Imports
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// MUI Icons
import TableChartIcon from '@mui/icons-material/TableChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import EditNoteIcon from '@mui/icons-material/EditNote';


export default function VIewProject() {
  return (
    <>
    <Grid Container>
      <Grid item xs={2}>
        <List
          sx={{ borderRadius: 3, boxShadow: 5, ml: 2, my: 3, width: "25%" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EditNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Project" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="Table" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Analysis" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={10}>
          <TableComp/>
      </Grid>
    </Grid>
  </>
  )
}
