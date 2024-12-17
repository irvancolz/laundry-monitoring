import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#096FB3",
      "200": "#F3F8FC",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#064b79",
    },
  },
});
