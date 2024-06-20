import { useAuth } from "@/application/hooks/useAuth";
import TitleOblique from "@/interface/components/TitleOblique";
import FlexBetween from "@/interface/components/box/flex-between.component";
import FlexCenter from "@/interface/components/box/flex-center.component";
import { AuthButton } from "@/interface/components/navbar/AuthButton";
import AvatarDropdown from "@/interface/components/navbar/AvatarDropdown";
import Logo from "@/interface/components/navbar/Logo";
import SwitchLangage from "@/interface/components/navbar/SwitchLangage";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useAuth();
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

  return (
    <FlexBetween
      sx={{
        height: "100px",
        px: 6,
      }}
    >
      <FlexCenter
        gap={2}
        sx={{ cursor: "pointer" }}
        onClick={handleButtonClick}
      >
        <Logo imageUrl="/icon.png" />
        <TitleOblique
          text="MY<span>PROT</span>TRACKER"
          sx={{ fontSize: "clamp(1rem, 0.4375rem + 1.5vw, 1.75rem)" }}
        />
      </FlexCenter>
      <FlexCenter>
        <SwitchLangage />
        <AvatarDropdown textAvatar={user?.firstName} items={LinkItem} />
        <AuthButton />
      </FlexCenter>
    </FlexBetween>
  );
}

export default Navbar;
