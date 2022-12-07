import { Box, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AdminCaffProductComponent } from "../../components/admin/adminCaffProductComponent";
import { useStore } from "../../stores";

export const EditProducts = observer(() => {
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
            <AdminCaffProductComponent caff={caff} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
