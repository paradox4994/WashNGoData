import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// MUI Imports
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// MUI Icons Import

import ShopRoundedIcon from '@mui/icons-material/ShopRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import Projects from "../components/Projects";
import Templates from "../components/Templates";
import TemplateStore from "../components/TemplateStore";

export default function Dashboard() {

  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(1)

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber)
  }


  return (
    <div>
      {user ? (
        <>
          <Grid container sx={{pt: 1, pl: 1}}>
            <Grid item xs={2}>
              <List sx={{backgroundColor: "#eaeaea", borderRadius: 3, boxShadow: 1}}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handlePageChange(1)}>
                    <ListItemIcon>
                      <LibraryAddRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handlePageChange(2)}>
                    <ListItemIcon>
                      <ViewListRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Templates" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handlePageChange(3)}>
                    <ListItemIcon>
                      <ShopRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Template Store" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={10}>
              {page === 1 && <Projects/>}
              {page === 2 && <Templates/>}
              {page === 3 && <TemplateStore/>}
            </Grid>
          </Grid>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
