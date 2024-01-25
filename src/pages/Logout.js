import { redirect } from "react-router-dom";

export const logoutAction = () => {
  console.log("REMOVING TOKEN AND REDIRECTING TO /auth");
  localStorage.removeItem("authToken");
  localStorage.clear();

  return redirect("/auth?mode=login");
};
