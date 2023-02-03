import React from "react";
import { redirect, useRouteLoaderData } from "react-router";
import EventItem from "../components/EventItem";
import { getLoginToken } from "../util/authFunctions";

const EventDetailPage = () => {
  const data = useRouteLoaderData("eventId");
  return (
    <>
      <EventItem event={data.event} />
    </>
  );
};

export default EventDetailPage;

export const EventDetailLoader = async ({ request, params }) => {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId
  );
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Unable to fetch event details." }),
      {
        status: 500,
      }
    );
  } else return response;
};

export const action = async ({ request, params }) => {
  console.log({ request, params });
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId,
    {
      method: request.method,
      headers: {
        Authorization: "Bearer " + getLoginToken(),
      },
    }
  );

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Unable to delete event." }), {
      status: 500,
    });
  }
  return redirect("/events");
};
