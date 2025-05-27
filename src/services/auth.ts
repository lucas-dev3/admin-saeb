import api from "./api";

export const TOKEN_KEY = "@saeb-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setLogin = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const setLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export async function loginAdmin(email: string, password: string) {
  const response = await api.post("/auth/login/admin", { email, password });
  const { accessToken } = response.data;
  setLogin(accessToken);

  return response.data;
}
