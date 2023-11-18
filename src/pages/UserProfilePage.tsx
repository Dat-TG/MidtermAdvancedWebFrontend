import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Paper,
  Modal,
  Box,
  CircularProgress,
} from "@mui/material";
import EditUserDialog from "../components/EditUserDialog";
import { toast } from "react-toastify";
import ChangePasswordDialog from "../components/ChangePasswordDialog";
import AvatarEditorComponent from "../components/AvatarEditorComponent";
import { AuthContext } from "../context/AuthContext";
import { useUser } from "../hooks/useUser";

function UserProfile() {
  useEffect(() => {
    document.title = "My profile";
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const { editInformation } = useUser();

  const [newAvatar, setNewAvatar] = useState("");

  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);

  const buttonStyle = {
    marginTop: "8px",
    color: "#0074D9",
    borderColor: "#0074D9",
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
          <Avatar
            alt={`${user?.firstname} ${user?.lastname}`}
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
          <AvatarEditorComponent setAvatar={setNewAvatar} />

          <div>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Email: {user?.email ?? "email@example.com"}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Name: {`${user?.firstname} ${user?.lastname}`}
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
            user={{
              firstname: user?.firstname ?? "John",
              lastname: user?.lastname ?? "Doe",
            }}
            onSave={(newUser: { firstname: string; lastname: string }) => {
              setIsLoading(true);
              editInformation({
                accessToken: user?.accessToken ?? "",
                firstname: newUser.firstname,
                lastname: newUser.lastname,
              }).then(() => setIsLoading(false));
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
      <Modal
        open={isLoading}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ padding: "8px" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Box>
      </Modal>
    </Grid>
  );
}

export default UserProfile;
