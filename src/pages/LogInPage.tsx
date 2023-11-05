import { Grid, Typography, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import LogInForm from "../components/LogInForm";

function LogInPage() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "32px" }}>
          <LogInForm />
          <Stack
            spacing={0.5}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent={"center"}
            marginTop={"16px"}
          >
            <Typography>Not a member yet?</Typography>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#0074D9" }}
            >
              Register
            </Link>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LogInPage;
