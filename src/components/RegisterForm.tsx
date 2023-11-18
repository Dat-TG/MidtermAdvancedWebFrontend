import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "../utils/helpers";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

type Inputs = {
  email: string;
  //name: string;
  password: string;
  confirmPassword: string;
};

function RegisterForm() {
  const { user } = useContext(AuthContext);
  const { register } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Handle register logic here
    setIsLoading(true);
    register({
      emailAddress: data.email,
      password: data.password,
    });

    //console.log(data);
    setIsLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassord] = useState(false);

  if (user != null) {
    return <Navigate to="/" replace />;
  }

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
          pattern: emailPattern,
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
      {/* <Controller
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
      />*/}

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
        {isLoading ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"}>Register</Typography>
        )}
      </Button>
    </form>
  );
}

export default RegisterForm;
