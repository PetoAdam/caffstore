import { Outlet } from "react-router-dom";
import { CustomerAppBar } from "../components/appBar";

export const CustomerLayout = () => {
  return (
    <>
      <CustomerAppBar />
      <Outlet />
    </>
  );
};
