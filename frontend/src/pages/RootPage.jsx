import React from "react";
import { Outlet, useLoaderData } from "react-router";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { useSubmit } from "react-router-dom";
import { getTokenExpiration } from "../util/authFunctions";

const RootPage = () => {
  // const nav = useNavigation();

  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
      return;
    }

    const tokenDuration = getTokenExpiration();
    console.log("token time left: " + tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      {/* <main>{nav.state === "loading" ? <LoadingSpinner /> : <Outlet />}</main> */}
      <Outlet />
    </>
  );
};

export default RootPage;
