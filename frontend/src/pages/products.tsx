import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { CaffProductComponent } from "../components/caffProductsComponent";
import { useStore } from "../stores";

export const Products = () => {
  const { caffStore } = useStore();

  useEffect(() => {
    caffStore.getCaffs();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 10 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ margin: 0 }}
      >
        {(caffStore.caffs != undefined) && (
          caffStore.caffs.map((caff, index) => (
            <Grid item xs={12} md={6} lg={3} key={"caff" + index}>
              <CaffProductComponent caff={caff} />
            </Grid>
          )))}
      </Grid>
    </Box>
  );
};
