import { Box, ListItemIcon } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import France from "../../../assets/flags/fr.svg";
import England from "../../../assets/flags/gb.svg";
import { Language } from "../../../infrastructure/translate/Language";

// Object mapping language codes to flag images
const flags: { [key: string]: string } = {
  fr: France,
  en: England,
};

const SwitchLangage = () => {
  // Hooks for managing language state and the anchor for the dropdown menu
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedFlag, setSelectedFlag] = useState<string>(i18n.language);
  const open = Boolean(anchorEl);
  // Function to change the app's language
  const changeLanguage = (flag: string) => {
    switch (flag) {
      case Language.EN:
        i18n.changeLanguage(Language.EN);
        break;
      case Language.FR:
      default:
        i18n.changeLanguage(Language.FR);
        break;
    }
  };

  // Event handlers for opening and selecting items in the language menu
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (flag: string) => {
    setSelectedFlag(flag);
    changeLanguage(flag);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        color: "#EAEDED",
        backgroundColor: "#121212",
        mr: 2,
        "& img": {
          width: "36px",
          height: "27px",
        },
      }}
    >
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemIcon
            sx={{
              minWidth: "fit-content",
            }}
          >
            <img src={flags[selectedFlag]} alt={flags[selectedFlag]} />
          </ListItemIcon>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        <MenuItem
          key={"France"}
          selected={"France" === selectedFlag}
          onClick={() => handleMenuItemClick(Language.FR)}
        >
          <ListItemIcon>
            <img
              src={France}
              alt="French flag"
              width={"36px"}
              height={"27px"}
            />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          key={"England"}
          selected={"England" === selectedFlag}
          onClick={() => handleMenuItemClick(Language.EN)}
        >
          <ListItemIcon>
            <img
              src={England}
              alt="English flag"
              width={"36px"}
              height={"27px"}
            />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SwitchLangage;
