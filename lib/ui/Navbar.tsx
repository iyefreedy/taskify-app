"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

export default function Navbar() {
  const { user, handleLogout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 80,
      }}
    >
      <Image src="./taskify.svg" alt="Taskift" width={80} height={36} />
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} size="small">
          <Avatar sx={{ width: 32, height: 32 }}>{user!.name.at(0)}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
}
