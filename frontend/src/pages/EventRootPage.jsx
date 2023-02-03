import React from "react";
import { Outlet } from "react-router";
import EventsNavigation from "../components/EventsNavigation";

const EventRootPage = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
};

export default EventRootPage;
