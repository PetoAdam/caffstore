import {
  Button,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";

type Props = {
  user: User;
};

export const AdminUserListComponent: React.FC<Props> = ({ user }) => {
  const [usernameBase, setUsernameBase] = useState(user.username);
  const [isAdminBase, setIsAdminBase] = useState(user.isAdmin);
  const [username, setUsername] = useState(user.username);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  const handleIsAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.value === "true");
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onSave = async () => {
    setUsernameBase(username);
    setIsAdminBase(isAdmin);
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, { isAdmin, username }, { merge: true });
  };

  const onDelete = async () => {
    await deleteDoc(doc(db, "users", user.uid));
    refreshPage();
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
          disabled={username === usernameBase && isAdmin === isAdminBase}
          onClick={onSave}
        >
          Save
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: 2 }}
          disabled={username === usernameBase && isAdmin === isAdminBase}
          onClick={() => {
            setUsername(user.username);
            setIsAdmin(user.isAdmin);
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: 2, backgroundColor: "red" }}
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

/* <FormControl sx={{ width: "10%" }} size="small">
        <Select
          value={isAdmin ? "true" : "false"}
          onChange={handleIsAdminChange}
        >
          <MenuItem value={"true"}>true</MenuItem>
          <MenuItem value={"false"}>false</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{ marginLeft: 2 }}
        disabled={username === usernameBase && isAdmin === isAdminBase}
        onClick={onSave}
      >
        Save
      </Button>
      <Button
        variant="contained"
        sx={{ marginLeft: 2 }}
        disabled={username === usernameBase && isAdmin === isAdminBase}
        onClick={() => {
          setUsername(user.username);
          setIsAdmin(user.isAdmin);
        }}
      >
        Reset
      </Button> */
