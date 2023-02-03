import { defer, useLoaderData, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventsPage;

export const EventsLoader = () => {
  return defer({
    events: loader(),
  });
};

export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {
    //   error: true,
    //   message: "Could not fetch data for this page",
    // };
    throw new Response(JSON.stringify({ message: "Unable to fetch events." }), {
      status: response.status,
    });
    // return json(
    //   { message: "Unable to fetch events." },
    //   { status: response.status }
    // );
  } else {
    const resData = await response.json();
    return resData.events;
    // return response;
  }
};
