import { Outlet } from "react-router-dom";
import { ResponsiveAppBar } from "../components/responsiveAppBar";

export const CustomerLayout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
};
