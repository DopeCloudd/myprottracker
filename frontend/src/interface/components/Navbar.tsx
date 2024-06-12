import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import TitleOblique from "./TitleOblique";
import FlexBetween from "./global/FlexBetween";
import FlexCenter from "./global/FlexCenter";
import AuthButton from "./navbar/AuthButton";
import AvatarDropdown from "./navbar/AvatarDropdown";
import Logo from "./navbar/Logo";
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
    <FlexBetween
      sx={{
        height: "100px",
        px: 6,
      }}
    >
      <FlexCenter>
        <Logo imageUrl="/icon.png" handleClick={handleButtonClick} />
        <TitleOblique
          text="MY<span>PROT</span>TRACKER"
          sx={{ ml: 2, fontSize: "clamp(1rem, 0.4375rem + 1.5vw, 1.75rem)" }}
          onClick={handleButtonClick}
        />
      </FlexCenter>
      <FlexCenter>
        <SwitchLangage />
        <AvatarDropdown textAvatar="Valentin" items={LinkItem} />
        <AuthButton user={null} onClick={handleLogin} />
      </FlexCenter>
    </FlexBetween>
  );
}

export default Navbar;
