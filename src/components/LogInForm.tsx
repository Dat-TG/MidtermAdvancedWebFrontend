import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

function LogInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Handle login logic here
    console.log(data);
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center" fontWeight={"bold"}>
        LOG IN
      </Typography>
      <Controller
        name="username"
        control={control}
        rules={{ required: true, pattern: /^[A-Za-z0-9]+$/ }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "48px" }}
            {...field}
            label="Username"
            fullWidth
            variant="outlined"
            error={!!errors.username}
            placeholder="username123"
            helperText={
              errors.username
                ? "Username is required and should only contain letters and numbers."
                : ""
            }
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true, minLength: 6 }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "32px" }}
            {...field}
            label="Password"
            fullWidth
            variant="outlined"
            error={!!errors.password}
            helperText={
              errors.password
                ? "Password is required and should be at least 6 characters."
                : ""
            }
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ display: field.value ? "flex" : "none" }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "32px" }}
        size="large"
      >
        <Typography fontSize={"16px"}>Login</Typography>
      </Button>
    </form>
  );
}

export default LogInForm;
