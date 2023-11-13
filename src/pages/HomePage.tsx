import { Typography } from "@mui/material";
import { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";

function HomePage() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <MainLayout>
        <Typography variant="h1" sx={{ margin: "30px" }}>
          Home Page
        </Typography>
      </MainLayout>
    </>
  );
}

export default HomePage;
