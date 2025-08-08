import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((store) => store.user || {});
  // console.log("PrivateRoute", currentUser);

  return currentUser.email ? <Outlet /> : <Navigate to="/sign-in" />;
}
