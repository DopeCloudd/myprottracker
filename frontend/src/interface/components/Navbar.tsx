import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TitleOblique from "./TitleOblique";
import AuthButton from "./navbar/AuthButton";
import AvatarDropdown from "./navbar/AvatarDropdown";
import SwitchLangage from "./navbar/SwitchLangage";

function Navbar() {
  const navigate = useNavigate();

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
      text: "Mes notifications",
      onClick: () => {
        navigate("/notifications");
      },
    },
  ];

  // Event handlers for navigation button clicks
  const handleButtonClick = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#EAEDED",
        fontWeight: "bold",
        fontSize: "18px",
        padding: "0 5%",
        "& img": {
          height: "100px",
          width: "100px",
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: { xs: "30px", sm: "40px" },
            width: { xs: "30px", sm: "40px" },
          }}
        >
          <img
            style={{
              height: "100%",
              width: "100%",
            }}
            src="/icon.png"
            alt="logo"
            onClick={handleButtonClick}
          />
        </Box>
        <TitleOblique
          fontSize="clamp(1rem, 0.4375rem + 1.5vw, 1.75rem)"
          onClick={handleButtonClick}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SwitchLangage />
        <AvatarDropdown textAvatar="Valentin" items={LinkItem} />
        <AuthButton user={null} onClick={handleLogin} />
      </Box>
    </Box>
  );
}

export default Navbar;
