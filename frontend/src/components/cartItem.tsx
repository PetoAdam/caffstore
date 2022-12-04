import { Button, darken, TableCell, TableRow } from "@mui/material";
import React from "react";
import { Caff } from "../types/Caff";
import { useStore } from "../stores";

type Props = {
  caff: Caff;
};

export const CartItem: React.FC<Props> = ({ caff }) => {
  const { userStore } = useStore();

  const onDelete = async () => {
    userStore.removeFromCart(caff);
  };

  return (
    <TableRow
      key={caff.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell>{caff.name}</TableCell>
      <TableCell>gratis</TableCell>

      <TableCell>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: darken("#ff0000", 0.3),
            },
          }}
          onClick={() => onDelete()}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

const rowStyle = {
  width: "100%",
  border: "none",
  "& fieldset": { border: "none" },
};
