import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

interface Inputs {
  firstname: string;
  lastname: string;
}

interface EditUserDialogProps {
  open: boolean; // Specify the type of 'open' as a boolean
  onClose: () => void;
  user: { firstname: string; lastname: string }; // Adjust the type for 'user' as needed
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
            name="firstname"
            control={control}
            defaultValue={user.firstname}
            rules={{
              required: "First name is required",
            }}
            render={({ field }) => (
              <TextField
                sx={{ marginTop: "32px" }}
                fullWidth
                label="First Name"
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            defaultValue={user.lastname}
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <TextField
                sx={{ marginTop: "32px", marginBottom: "32px" }}
                fullWidth
                label="Last Name"
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
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
