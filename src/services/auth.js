export const getToken = () => localStorage.getItem("ninja-house-token");
export const login = (token) =>
  localStorage.setItem("ninja-house-token", token);
export const logout = () => localStorage.removeItem("ninja-house-token");
export const isAuthenticated = () =>
  localStorage.getItem("ninja-house-token") !== null;
