import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminAppBar } from "../components/adminAppBar";
import { ResponsiveAppBar } from "../components/responsiveAppBar";

export const AdminLayout = () => {
  return (
    <>
      <AdminAppBar />
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
      <AdminAppBar />
      <Outlet />
    </>
  );
};