import { React, useState } from "react";
import TableComp from "../../components/TableComp";
import ProjectInfo from "../../components/ProjectInfo";
import ProjectTable from "../../components/ProjectTable";

// MUI Imports
import {
  Button,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// MUI Icons
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TableChartIcon from "@mui/icons-material/TableChart";
import { color } from "@mui/system";

export default function NewProject() {
  const [page, setPage] = useState(1);

  const handlePageChange = (pageNo) => {
    setPage(pageNo)
  }

  return (
    <>
      <Stack direction="row">
        <Container
          component="div"
          sx={{
            borderRadius: 3,
            boxShadow: 5,
            ml: 2,
            mt: 3,
            width: "25%",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePageChange(1)} disableRipple>
                <ListItemIcon>
                  <BorderColorIcon />
                </ListItemIcon>
                <ListItemText primary="Projects Information" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handlePageChange(2)} disableRipple>
                <ListItemIcon>
                  <TableChartIcon />
                </ListItemIcon>
                <ListItemText primary="Project Data" />
              </ListItemButton>
            </ListItem>
          </List>
        </Container>
        <Container
          component="div"
          sx={{
            minHeight: "80vh",
            borderRadius: 3,
            boxShadow: 5,
            mx: 3,
            mt: 3,
            mb: "auto",
          }}
        >
          {page === 1 && <ProjectInfo />}
          {page === 2 && <ProjectTable />}
        </Container>
      </Stack>
    </>
  );
}

