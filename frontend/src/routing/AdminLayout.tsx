import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ResponsiveAppBar } from "../components/responsiveAppBar";

export const AdminLayout = () => {
  return (
    <>
      <ResponsiveAppBar isAdmin />
      <Outlet />
    </>
  );
};

type Props = {
  isAdmin: boolean;
};

export const ProtectedAdminLayout: React.FC<Props> = ({ isAdmin }) => {
  if (!isAdmin) return <Navigate to={"/"} replace />;
  return (
    <>
      <Outlet />
    </>
  );
};
