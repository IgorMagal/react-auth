import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router";

const EditEventPage = () => {
  const data = useRouteLoaderData("eventId");
  console.log(data.event);
  return (
    <>
      <h2>Edit Event</h2>
      <EventForm event={data.event} method="patch" />
    </>
  );
};

export default EditEventPage;
