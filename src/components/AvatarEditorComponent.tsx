import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { RotateLeft, RotateRight } from "@mui/icons-material";
import { useUser } from "../hooks/useUser";

function AvatarEditorComponent() {
  const [image, setImage] = useState("");
  const editorRef = useRef<AvatarEditor | null>(null);

  const { changeAvatar } = useUser();

  const [scale, setScale] = useState(0);
  const [rotate, setRotate] = useState(0);

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setIsOpen(true);
      e.target.value = "";
    }
  };

  const handleSaveAvatar = () => {
    //const canvas = editorRef.current?.getImage();

    // If you want the image resized to the canvas size (also a HTMLCanvasElement)
    const canvasScaled = editorRef.current?.getImageScaledToCanvas();

    canvasScaled?.toBlob((blob) => {
      // Create a File object from the blob
      const file = new File([blob!], "editedImage.png", { type: "image/png" });

      // Use 'file' as needed, for example, uploading to a server or displaying in the UI
      // Here, you can perform actions like uploading to a server or updating state with the File object
      // For example:
      // uploadFileToServer(file);
      // setEditedFile(file);
      changeAvatar({ imageFile: file });
    }, "image/png");
    setIsOpen(false);
  };

  const inputStyle = {
    display: "none",
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label htmlFor="avatar-input">
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
        </label>
        <input
          accept="image/*"
          id="avatar-input"
          type="file"
          style={inputStyle}
          onChange={handleImageChange}
        />
      </Box>
      <Dialog
        open={modalIsOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          {image && (
            <AvatarEditor
              ref={(ref) => (editorRef.current = ref)}
              image={image}
              width={400}
              height={400}
              border={50}
              color={[255, 255, 255, 0.6]}
              scale={1 + scale / 100}
              rotate={rotate}
              borderRadius={9999}
            />
          )}
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            justifyContent={"center"}
          >
            <IconButton
              size="small"
              onClick={() => setRotate((rotate - 90) % 360)}
            >
              <RotateLeft />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setRotate((rotate + 90) % 360)}
            >
              <RotateRight />
            </IconButton>
          </Stack>
          <Box display={"flex"} justifyContent={"center"}>
            <input
              type="range"
              id="vol"
              name="vol"
              min="0"
              max="200"
              value={scale}
              onChange={(event) => {
                setScale(parseInt(event.target.value));
              }}
              className="w-full"
            ></input>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSaveAvatar}
          >
            Set new profile picture
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AvatarEditorComponent;
