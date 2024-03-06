import { Box, Stack, Paper, Typography, Container } from '@mui/material'
import React from 'react'

export default function Home() {
  return (
    <Box sx={{width: "100%",}}>
      <Stack sx={{px: 10}}>

        {/*First row with wide Image with a Quote*/}
        <Box  
        component="img" 
        src="/wide1.jpeg" 
        alt="Landing Photo">  
        </Box>


        {/* Second row with input data image and text */}
        <Box sx={{display: "flex", justifyContent: "space-around", flexDirection: "row", alignItems: "center" }}>
        <Container 
        sx={{
          height: "50%",
        }}
        component="img" 
        src="/collect.png"/>
        <Container>
          <Typography variant="h4" sx={{color: "#2196F3", mb: 1.5}} >Efficient Data Collection and Entry</Typography>
          <Typography sx={{fontSize: "1.2rem"}}>Streamline your environmental data collection process with our user-friendly web application. Engineers, scientists, and users can effortlessly input data, ensuring accuracy and completeness. The intuitive interface allows for easy customization of templates, ensuring that collected data seamlessly fits into predefined structures, enhancing efficiency and reducing errors.</Typography>
        </Container>
        </Box>


        {/* Third row with template image and text */}
        <Box sx={{display: "flex", justifyContent: "space-around", flexDirection: "row-reverse", alignItems: "center" }}>
        <Container 
        sx={{
          height: "50%"
        }}
        component="img" 
        src="/template.png"/>
        <Container>
          <Typography variant="h4" sx={{color: "#2196F3", mb: 1.5}}>
            Template Selection for Effortless Customization
          </Typography>
          <Typography sx={{fontSize: "1.2rem"}}>
          Elevate your environmental data analysis with detailed reports tailored to your specific needs. Our web application enables users to generate comprehensive reports that include in-depth insights and analytics. Scientists can leverage these reports for research, and engineers can utilize them for compliance assessments, ensuring that all stakeholders have access to the information necessary for informed decision-making.
          </Typography>
        </Container>
        </Box>


        {/* Fourth row with Dashboard image and text */}
        <Box sx={{display: "flex", justifyContent: "space-around", flexDirection: "row", alignItems: "center"}}>
        <Container 
        sx={{
          height: "50%"
        }}
        component="img" 
        src="/dashboard.png"/>
        <Container>
          <Typography variant="h4" sx={{color: "#2196F3", mb: 1.5}}>Insightful Analytics</Typography>
          <Typography sx={{fontSize: "1.2rem"}}>Dive into your environmental data through our powerful dashboard feature. Instantly generate dynamic graphs and charts that visually represent your data trends. Engineers and scientists can gain valuable insights at a glance, facilitating quick decision-making. The customizable dashboard ensures that you see the information that matters most to you, making data interpretation a breeze.</Typography>
        </Container>
        </Box>


        {/* Fifth row with reports image and text */}
        <Box sx={{display: "flex", justifyContent: "space-around", flexDirection: "row-reverse", alignItems: "center"}}>
        <Container 
        sx={{
          height: "50%"
        }}
        component="img" 
        src="/reports.png"/>
        <Container>
          <Typography variant="h4" sx={{color: "#2196F3", mb: 1.5}}>Detailed Reports</Typography>
          <Typography sx={{fontSize: "1.2rem"}}>Our tool goes beyond data management, providing a robust compliance tracking system. Engineers can effortlessly monitor compliance with environmental regulations, and scientists can ensure that their research aligns with established standards. The application automates compliance checks, providing peace of mind and allowing users to focus on their core tasks, knowing that regulatory requirements are consistently met.</Typography>
        </Container>
        </Box>
      </Stack>
    </Box>
  )
}
