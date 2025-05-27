import { isAuthenticated } from "../../services/auth";
import { Navigate, Outlet } from "react-router-dom";

export function Private() {
  const auth = isAuthenticated();

  return auth ? <Outlet /> : <Navigate to="/login" />;
}
