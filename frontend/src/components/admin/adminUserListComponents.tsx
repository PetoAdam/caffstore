import {
  Button,
  darken,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import { User } from "../../types/User";

type Props = {
  user: User;
  reset: () => void;
};

export const AdminUserListComponent: React.FC<Props> = ({ user, reset }) => {
  const [username, setUsername] = useState(user.username);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const handleIsAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.value === "true");
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onSave = async () => {
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, { isAdmin, username }, { merge: true });
    reset();
  };

  const onDelete = async () => {
    await deleteDoc(doc(db, "users", user.uid));
    reset();
  };

  return (
    <TableRow
      key={user.uid}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell>
        <TextField
          disabled
          defaultValue={user.email}
          size="small"
          sx={rowStyle}
        />
      </TableCell>
      <TableCell>
        <TextField
          disabled
          defaultValue={user.uid}
          size="small"
          sx={rowStyle}
        />
      </TableCell>
      <TableCell>
        <TextField
          defaultValue={user.username}
          size="small"
          sx={rowStyle}
          onChange={handleUsernameChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          select
          value={isAdmin ? "true" : "false"}
          onChange={handleIsAdminChange}
        >
          <MenuItem value={"true"}>true</MenuItem>
          <MenuItem value={"false"}>false</MenuItem>
        </TextField>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          sx={{ marginLeft: 2 }}
          disabled={username === user.username && isAdmin === user.isAdmin}
          onClick={onSave}
        >
          Save
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: 2 }}
          disabled={username === user.username && isAdmin === user.isAdmin}
          onClick={() => {
            setUsername(user.username);
            setIsAdmin(user.isAdmin);
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          sx={{
            marginLeft: 2,
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: darken("#ff0000", 0.3),
            },
          }}
          onClick={() => onDelete()}
        >
          Delete
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
