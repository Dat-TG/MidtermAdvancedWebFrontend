import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h1" sx={{ margin: "30px" }}>
        Home Page
      </Typography>
      <Button
        sx={{ marginLeft: "30px" }}
        variant="contained"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>
    </>
  );
}

export default HomePage;
