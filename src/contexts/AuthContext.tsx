import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { loginAdmin, setLogout, isAuthenticated, getToken } from "../services/auth";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  authenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const checkAuth = () => setAuthenticated(isAuthenticated());
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await loginAdmin(email, password);
    setAuthenticated(true);
    return data;
  }, []);

  const logout = useCallback(() => {
    setLogout();
    setAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, isAuthenticated, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}

interface ProtectRouteProps {
  children: React.ReactNode;
}

export function ProtectRoute({ children }: ProtectRouteProps) {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
} 