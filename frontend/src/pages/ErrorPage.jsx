import React from "react";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();
  console.log("error: " + JSON.stringify(error));
  return (
    <>
      <MainNavigation />
      <PageContent title={`Error: ${error.status}`}>
        <h3>{`Message: ${error.statusText}`}</h3>
      </PageContent>
    </>
  );
};

export default ErrorPage;
