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
        gap={2}
        sx={{ cursor: "pointer" }}
        onClick={handleButtonClick}
      >
        <Logo imageUrl="/icon.png" />
        <TextTitleOblique
          text="MY<span>PROT</span>TRACKER"
          sx={{ fontSize: "clamp(1rem, 0.4375rem + 1.5vw, 1.75rem)" }}
        />
      </FlexCenter>
      <FlexCenter>
        <SwitchLangage />
        <AvatarDropdown textAvatar={user?.firstName} items={LinkItem} />
        <ButtonAuth />
      </FlexCenter>
    </FlexBetween>
  );
}

export default Navbar;
