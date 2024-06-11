import { Theme, createTheme } from "@mui/material";
import Integral from "./fonts/Fontspring-DEMO-integralcf-regular.otf";
import IntegralOblique from "./fonts/Fontspring-DEMO-integralcf-regularoblique.otf";

export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00A656",
      dark: "#171717",
      contrastText: "#EAEDED",
      light: "#EAEDED",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": [
          {
            fontFamily: "Integral",
            src: `url(${Integral}) format('truetype')`,
            unicodeRange:
              "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
          },
          {
            fontFamily: "Integral Oblique",
            src: `url(${IntegralOblique}) format('truetype')`,
            unicodeRange:
              "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
          },
        ],
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        "html, body, #root": {
          width: "100%",
          height: "100%",
          backgroundColor: "#121212",
        },
      },
    },
  },
});
