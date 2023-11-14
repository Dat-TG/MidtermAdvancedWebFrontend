import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import CourseCard from "../components/landingpage/CourseCard";

function HomePage() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <MainLayout>
        <>
          <Typography variant="h1" sx={{ margin: "30px" }}>
            Home Page
          </Typography>
        </>

        <Box gap={2} sx={{ ml: 3, display : "flex", flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5, 6, 7].map(() => (
            <Grid item xs={2}>
              <CourseCard />
            </Grid>
          ))}
        </Box>
      </MainLayout>
    </>
  );
}

export default HomePage;
