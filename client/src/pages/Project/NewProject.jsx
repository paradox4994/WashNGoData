import { React } from "react";
import ProjectInfo from "../../components/ProjectInfo";

// MUI Imports
import {
  Container,
} from "@mui/material";

export default function NewProject() {

  return (
    <>
        <Container
          component="div"
          sx={{
            minHeight: "80vh",
            width: "100%",
            borderRadius: 3,
            boxShadow: 5,
            mt: 3,
            pb: 3
          }}
        >
          <ProjectInfo />
        </Container>
    </>
  );
}

