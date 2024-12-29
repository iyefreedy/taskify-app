"use client";

import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  display: "none",
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: theme.vars.palette.background.paper,
  },
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

export default function SideMenu() {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TaskRoundedIcon />
            </ListItemIcon>
            <ListItemText>Tasks</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
