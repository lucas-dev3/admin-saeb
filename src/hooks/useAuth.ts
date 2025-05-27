import { useState, useCallback } from "react";
import { isAuthenticated, getToken, setLogout, loginAdmin } from "../services/auth";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  const login = useCallback(async (email: string, password: string) => {
    const data = await loginAdmin(email, password);
    setAuthenticated(true);
    return data;
  }, []);

  const logout = useCallback(() => {
    setLogout();
    setAuthenticated(false);
  }, []);

  return {
    authenticated,
    login,
    logout,
    isAuthenticated,
    getToken,
  };
}
