import { redirect } from "react-router-dom";

export const action = () => {
  localStorage.removeItem("loginToken");
  localStorage.removeItem("tokenExpiration");
  return redirect("/");
};
