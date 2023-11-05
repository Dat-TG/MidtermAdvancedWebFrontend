import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditUserDialog from "../components/EditUserDialog";
import { toast } from "react-toastify";
import ChangePasswordDialog from "../components/ChangePasswordDialog";

function UserProfile() {
  useEffect(() => {
    document.title = "My profile";
  }, []);

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const [newAvatar, setNewAvatar] = useState("");

  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);

  const buttonStyle = {
    marginTop: "8px",
    color: "#0074D9",
    borderColor: "#0074D9",
  };

  const inputStyle = {
    display: "none",
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "32px" }}>
          <input
            accept="image/*"
            id="avatar-input"
            type="file"
            style={inputStyle}
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar-input">
            <Avatar
              alt={user.name}
              src={newAvatar || "/path-to-avatar-image.jpg"}
              sx={{
                width: {
                  md: 150,
                  sm: 100,
                  xs: 100,
                },
                height: {
                  md: 150,
                  sm: 100,
                  xs: 100,
                },
                margin: "0 auto",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                component="span"
                TouchRippleProps={{ center: true }}
                size="medium"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
            </Box>
          </label>
          <div>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Email: {user.email}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Name: {user.name}
            </Typography>
          </div>

          <Button
            style={buttonStyle}
            variant="outlined"
            fullWidth
            onClick={() => {
              setIsEditUserDialogOpen(true);
            }}
          >
            Edit information
          </Button>

          <Button
            style={buttonStyle}
            variant="outlined"
            fullWidth
            onClick={() => {
              setIsChangePasswordDialogOpen(true);
            }}
          >
            Change Password
          </Button>

          <EditUserDialog
            open={isEditUserDialogOpen}
            onClose={() => {
              setIsEditUserDialogOpen(false);
            }}
            user={user}
            onSave={(user: { email: string; name: string }) => {
              console.log(user);
              setUser(user);
              toast("Update information successful!", {
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
            }}
          />

          <ChangePasswordDialog
            open={isChangePasswordDialogOpen}
            onClose={() => {
              setIsChangePasswordDialogOpen(false);
            }}
            onChangePassword={(data: {
              oldPassword: string;
              newPassword: string;
            }) => {
              console.log(data);
              toast("Change password successful!", {
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
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
