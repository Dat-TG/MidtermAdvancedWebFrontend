import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Divider } from "@mui/material";
import { CalendarMonth, Home, School } from "@mui/icons-material";

const drawerWidth = 240;

interface Props {
  open: boolean;
}

const MiniDrawer: React.FC<Props> = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        border: 1,
        borderColor: (theme) => theme.palette.divider,
        overflowX: "hidden",
        width: props.open ? `${drawerWidth}px` : "72px",
        transition: "width 0.2s, padding 0.3s",
      }}
    >
      <CssBaseline />
      <div>
        <List>
          {["Home", "Calendar"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: props.open ? "initial" : "center",
                  px: 2.5,
                  whiteSpace: "nowrap",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: props.open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <Home /> : <CalendarMonth />}
                </ListItemIcon>
                {props.open && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["School", "Inbox", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: props.open ? "initial" : "center",
                  px: 2.5,
                  whiteSpace: "nowrap",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: props.open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <School /> : <InboxIcon />}
                </ListItemIcon>
                {props.open && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
};

export default MiniDrawer;
