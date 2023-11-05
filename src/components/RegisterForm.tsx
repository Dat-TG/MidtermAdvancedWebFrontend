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
import { toast } from "react-toastify";

type Inputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Handle login logic here
    toast("Register successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
    });
    console.log(data);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassord] = useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center" fontWeight={"bold"}>
        REGISTER
      </Typography>
      {/* Email input */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "48px" }}
            {...field}
            label="Email"
            fullWidth
            variant="outlined"
            error={!!errors.email}
            placeholder="email@example.com"
            helperText={
              errors.email ? "Please enter a valid email address." : ""
            }
          />
        )}
      />
      {/* Name input */}
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "32px" }}
            {...field}
            label="Name"
            fullWidth
            variant="outlined"
            error={!!errors.name}
            placeholder=""
            helperText={errors.name ? "Please enter your name." : ""}
          />
        )}
      />
      {/* Password input */}
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
      {/* Confirm password input */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: true,
          validate: (value) => value === getValues("password"),
        }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "32px" }}
            {...field}
            label="Confirm Password"
            fullWidth
            variant="outlined"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? "Passwords do not match." : ""}
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowConfirmPassord(!showConfirmPassword)}
                    style={{ display: field.value ? "flex" : "none" }}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
        <Typography fontSize={"16px"}>Register</Typography>
      </Button>
    </form>
  );
}

export default RegisterForm;
