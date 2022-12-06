import { Box, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { CaffProductComponent } from "../components/caffProductsComponent";
import { useStore } from "../stores";

export const Products = observer(() => {
  const { caffStore } = useStore();

  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      caffStore.getCaffs();
    }

    return () => {
      effectRan.current = true;
    };
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
        {caffStore.caffs.map((caff, index) => (
          <Grid item xs={12} md={6} lg={3} key={"caff" + index}>
            <CaffProductComponent caff={caff} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
