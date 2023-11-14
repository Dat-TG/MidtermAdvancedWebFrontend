import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Divider, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Assignment } from "@mui/icons-material";

const CourseCard = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginTop: "35px" }}
    >
      <MenuItem>Move</MenuItem>
      <MenuItem>Leave</MenuItem>
    </Menu>
  );
  return (
    <Card
      sx={{
        width: 290,
        height: 330,
        position: "relative",
        "&:hover": {
          transform: "scale(1.005)",
          transition: "0.1s",
          boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer'
        },
      }}
    >
      <Box>
        <CardMedia
          component="img"
          image="https://cdn.pixabay.com/photo/2015/09/23/08/51/banner-953147_1280.jpg"
          alt="Paella dish"
          sx={{
            width: "100%",
            height: 120,
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      </Box>

      <Box sx={{ position: "absolute", top: 0, left: 0 }}>
        <CardHeader
          avatar={
            <Box sx={{ pt: 1 }}>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            </Box>
          }
          action={
            <IconButton
              aria-label="settings"
              sx={{ color: "white" }}
              onClick={handleProfileMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography sx={{ fontSize: 15, pt: 1 }} variant="h4">
              Shrimp and Chorizo Paella
            </Typography>
          }
          subheader={
            <Typography sx={{ fontSize: 13 }} component="p">
              September 14, 2016
            </Typography>
          }
          sx={{
            color: "white",
            zIndex: 1,
            height: 120,
            alignItems: "flex-start",
          }}
        />

        <CardContent
          sx={{ zIndex: 1, height: 145, overflow: "hidden" }}
        ></CardContent>
        <Divider />
        <CardActions
          disableSpacing
          sx={{ zIndex: 1, display: "flex", justifyContent: "end" }}
        >
          <IconButton aria-label="add to favorites" sx={{ mr: 1 }}>
            <Assignment />
          </IconButton>
          <IconButton aria-label="share" sx={{ mr: 1 }}>
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Box>
      {renderMenu}
    </Card>
  );
};

export default CourseCard;
