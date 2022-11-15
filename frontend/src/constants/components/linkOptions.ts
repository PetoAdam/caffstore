import { Components } from "@mui/material";
import { colors } from "../color";

export const linkOptions: Components["MuiLink"] = {
  styleOverrides: {
    root: {
      ...{
        textDecoration: "none",
      },
    },
  },
};
