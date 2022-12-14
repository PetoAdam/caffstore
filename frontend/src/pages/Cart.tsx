import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { CartItem } from "../components/cartItem";
import { caffService } from "../services/caffService";
import { useStore } from "../stores";

export const Cart = observer(() => {
  const { userStore } = useStore();

  const onCheckout = () => {
    // todo - download - check this with backend
    userStore.cart.forEach(async (caff) => {
      try {
        const downloadFile = await caffService.getDownloadCaff(caff.id);
        console.log(downloadFile.file);

        const a = document.createElement("a");
        a.download = `${caff.name}.caff`;
        a.href = downloadFile.file;
        a.click();
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <Box
      sx={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "50%", flexDirection: "column", display: "flex" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell width={"20%"}>Price</TableCell>
                <TableCell width={"20%"}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userStore.cart.map((caff, index) => (
                <CartItem caff={caff} key={"caff" + index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{ alignSelf: "flex-end", marginTop: 10 }}
          variant="contained"
          onClick={onCheckout}
        >
          Check out & download
        </Button>
      </Box>
    </Box>
  );
});
