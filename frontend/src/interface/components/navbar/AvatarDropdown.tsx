import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
} from "@mui/material";
import { useState } from "react";

type Item = {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
};

interface AvatarDropdownProps {
  textAvatar?: string;
  items?: Item[];
}

export default function AvatarDropdown({
  textAvatar,
  items,
}: AvatarDropdownProps) {
  const [avatarEl, setAvatarEl] = useState<HTMLElement | null>(null);

  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>): void => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const open = Boolean(avatarEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ mr: { xs: 1, md: 3 } }}>
      <Stack direction="row" spacing={1}>
        <Button aria-describedby={id} onClick={handleAvatarClick}>
          <Avatar
            sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }}
          >
            {textAvatar?.charAt(0)}
          </Avatar>
          <KeyboardArrowDownIcon />
        </Button>
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={avatarEl}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List disablePadding>
          {items?.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
}
