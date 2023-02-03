import { redirect } from "react-router-dom";

export const getLoginToken = () => {
  const token = localStorage.getItem("loginToken");

  const tokenTimeLeft = getTokenExpiration();

  if (!token) {
    return null;
  }

  if (tokenTimeLeft <= 0) {
    return "EXPIRED";
  }

  return token;
};

export const loadLoginToken = () => {
  return getLoginToken();
};

export const checkForToken = () => {
  const token = getLoginToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
};

export const getTokenExpiration = () => {
  const tokenTimeLeft = new Date(
    localStorage.getItem("tokenExpiration")
  ).getTime();
  const now = new Date().getTime();
  return tokenTimeLeft - now;
};
