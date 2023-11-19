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
import ChangePasswordDialog from "../components/ChangePasswordDialog";
import AvatarEditorComponent from "../components/AvatarEditorComponent";
import { AuthContext } from "../context/AuthContext";
import {
  updateInformationUser,
  updatePasswordUser,
} from '@/store/user/thunkApi';

function UserProfile() {
  useEffect(() => {
    document.title = 'My profile';
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const [newAvatar, setNewAvatar] = useState('');

  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);

  const buttonStyle = {
    marginTop: '8px',
    color: '#0074D9',
    borderColor: '#0074D9',
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '32px' }}>
          <Avatar
            alt={`${user?.firstname} ${user?.lastname}`}
            src={newAvatar || '/path-to-avatar-image.jpg'}
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
              margin: '0 auto',
            }}
          />
          <AvatarEditorComponent setAvatar={setNewAvatar} />

          <div>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              Email: {user?.email ?? 'email@example.com'}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
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
              firstname: user?.firstname ?? 'John',
              lastname: user?.lastname ?? 'Doe',
            }}
            onSave={(newUser: { firstname: string; lastname: string }) => {
              setIsLoading(true);
              updateInformationUser({
                name: newUser.firstname,
                surname: newUser.lastname,
              });
              setIsLoading(false);
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
              confirmNewPassword: string;
            }) => {
              console.log(data);
              setIsLoading(true);
              updatePasswordUser({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmNewPassword,
              });
              setIsLoading(false);
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
          sx={{ padding: '8px' }}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <CircularProgress />
        </Box>
      </Modal>
    </Grid>
  );
}

export default UserProfile;
