import React from "react";
import EventForm from "../components/EventForm";
import PageContent from "../components/PageContent";

const NewEventPage = () => {
  return (
    <PageContent title="New Event">
      <EventForm method="post" />
    </PageContent>
  );
};

export default NewEventPage;
