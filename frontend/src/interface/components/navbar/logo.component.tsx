import { Box } from "@mui/material";

type LogoProps = {
  imageUrl: string;
};

export default function Logo(props: LogoProps) {
  return (
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
        src={props.imageUrl}
        alt="MyProtTracker Logo"
      />
    </Box>
  );
}
