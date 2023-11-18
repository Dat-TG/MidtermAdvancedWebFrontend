import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onChangePassword: (data: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string
  }) => void;
}

type Inputs = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

function ChangePasswordDialog({
  open,
  onClose,
  onChangePassword,
}: ChangePasswordDialogProps) {
  const { control, handleSubmit, formState, getValues } = useForm<Inputs>();
  const { errors } = formState;
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const onSubmit = (data: Inputs) => {
    onChangePassword(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="oldPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Old Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                sx={{ marginTop: "32px" }}
                fullWidth
                type={showOldPassword ? "text" : "password"}
                label="Old Password"
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        style={{ display: field.value ? "flex" : "none" }}
                        edge="end"
                      >
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                sx={{ marginTop: "32px" }}
                fullWidth
                type={showNewPassword ? "text" : "password"}
                label="New Password"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{ display: field.value ? "flex" : "none" }}
                        edge="end"
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="confirmNewPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Confirm New Password is required",
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            }}
            render={({ field }) => (
              <TextField
                sx={{ marginTop: "32px", marginBottom: "32px" }}
                fullWidth
                type={showConfirmNewPassword ? "text" : "password"}
                label="Confirm New Password"
                error={!!errors.confirmNewPassword}
                helperText={errors.confirmNewPassword?.message}
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() =>
                          setShowConfirmNewPassword(!showConfirmNewPassword)
                        }
                        style={{ display: field.value ? "flex" : "none" }}
                        edge="end"
                      >
                        {showConfirmNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordDialog;
