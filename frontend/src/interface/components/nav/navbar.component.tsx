import { useAuth } from "@/application/hooks/useAuth";
import FlexBetween from "@/interface/components/box/flex-between.component";
import FlexCenter from "@/interface/components/box/flex-center.component";
import { ButtonAuth } from "@/interface/components/button/button-auth.component";
import AvatarDropdown from "@/interface/components/navbar/avatar-dropdown.component";
import Logo from "@/interface/components/navbar/logo.component";
import SwitchLangage from "@/interface/components/navbar/switch-langage.component";
import TextTitleOblique from "@/interface/components/text/text-title-oblique.component";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const LinkItem = [
    {
      icon: <PersonIcon />,
      text: "Mon compte",
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      icon: <FavoriteIcon />,
      text: "Mes favoris",
      onClick: () => {
        navigate("/favorites");
      },
    },
    {
      icon: <NotificationsIcon />,
      text: "Mes alertes",
      onClick: () => {
        navigate("/alerts");
      },
    },
  ];

  if (user?.role === "ADMIN") {
    LinkItem.push({
      icon: <PersonIcon />,
      text: "Admin",
      onClick: () => {
        navigate("/admin");
      },
    });
  }

  // Event handlers for navigation button clicks
  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <FlexBetween
      component="nav"
      sx={{
        height: "100px",
        px: { xs: 3, sm: 6 },
      }}
    >
      <FlexCenter
        gap={{ xs: 1, md: 2 }}
        sx={{ cursor: "pointer" }}
        onClick={handleButtonClick}
      >
        <Logo imageUrl="/icon.png" />
        <TextTitleOblique
          text="MY<span>PROT</span>TRACKER"
          sx={{ fontSize: "clamp(1rem, 0.4375rem + 1.5vw, 1.75rem)" }}
        />
      </FlexCenter>

      {/* For mobile menu */}
      <FlexCenter sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          edge="start"
          sx={{ display: { xs: "block", md: "none" } }} // Show only on mobile (xs)
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </FlexCenter>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }} // Display only on mobile
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            {LinkItem.map((item, index) => (
              <ListItemButton key={index} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* For desktop menu */}
      <FlexCenter sx={{ display: { xs: "none", md: "flex" } }}>
        <SwitchLangage />
        <AvatarDropdown textAvatar={user?.firstName} items={LinkItem} />
        <ButtonAuth />
      </FlexCenter>
    </FlexBetween>
  );
}

export default Navbar;
