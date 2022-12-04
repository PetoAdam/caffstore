import { createTheme } from "@mui/material/styles";
import { colors } from "./color";
import { linkOptions } from "./components/linkOptions";

export const theme = createTheme({
  typography: {
    fontFamily: "OpenSans,Inter,Helvetica,Arial,sans-serif;",
  },
  palette: {
    background: {
      default: colors.white,
    },

    text: {
      primary: colors.black,
      secondary: colors.black,
    },
  },
  components: {
    MuiLink: linkOptions,
  },
});
