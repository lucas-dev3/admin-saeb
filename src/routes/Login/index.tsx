import { Outlet } from "react-router-dom";

import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";

export function Login() {
  const auth = isAuthenticated();

  return !auth ? <Outlet /> : <Navigate to="/dashboard" />;
}