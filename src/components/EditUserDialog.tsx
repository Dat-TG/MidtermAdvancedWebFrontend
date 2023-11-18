import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { emailPattern } from "../utils/helpers";

interface Inputs {
  email: string;
  name: string;
  firstname: string;
  lastname: string;
}

interface EditUserDialogProps {
  open: boolean; // Specify the type of 'open' as a boolean
  onClose: () => void;
  user: { email: string; name: string }; // Adjust the type for 'user' as needed
  onSave: (user: Inputs) => void;
}

function EditUserDialog({ open, onClose, user, onSave }: EditUserDialogProps) {
  const handleClose = () => {
    onClose();
  };

  const onSubmit = (data: Inputs) => {
    onSave(data);
    handleClose();
  };

  const { control, handleSubmit, formState } = useForm<Inputs>();
  const { errors } = formState;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User Information</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue={user.email}
            rules={{
              required: "Email is required",
              pattern: {
                value: emailPattern,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                sx={{ marginTop: "32px" }}
                fullWidth
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            defaultValue={user.name}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                sx={{ marginTop: "32px", marginBottom: "32px" }}
                fullWidth
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
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

export default EditUserDialog;
