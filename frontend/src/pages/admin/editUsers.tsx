import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AdminUserListComponent } from "../../components/adminUserListComponents";
import { db } from "../../firebase";

export type User = {
  email: string;
  isAdmin: boolean;
  uid: string;
  username: string;
};

export const EditUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const usersRef = collection(db, "users");
    const docSnap = await getDocs(usersRef);
    const temp: User[] = [];
    docSnap.forEach((userDoc) => {
      const user = userDoc.data();
      temp.push({
        email: user.email,
        isAdmin: user.isAdmin ? true : false,
        uid: user.uid,
        username: user.username,
      } as User);
    });
    setUsers(temp);
    return;
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box
      sx={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Is admin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <AdminUserListComponent user={user} key={"user" + index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
