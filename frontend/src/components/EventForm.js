import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import classes from "./EventForm.module.css";
import { getLoginToken } from "../util/authFunctions";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <>
      <Form method={method} className={classes.form}>
        {actionData && actionData.errors && (
          <ul>
            {Object.values(actionData.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <p>
          <label htmlFor="title">Title</label>
          <input
            disabled={isSubmitting}
            id="title"
            type="text"
            name="title"
            required
            defaultValue={event ? event.title : ""}
          />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input
            disabled={isSubmitting}
            id="image"
            type="url"
            name="image"
            required
            defaultValue={event ? event.image : ""}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            disabled={isSubmitting}
            id="date"
            type="date"
            name="date"
            required
            defaultValue={event ? event.date : ""}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            disabled={isSubmitting}
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={event ? event.description : ""}
          />
        </p>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default EventForm;

export const action = async ({ request, params }) => {
  const method = request.method;
  const formData = Object.fromEntries(await request.formData());
  console.log("Method: " + request.method);

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    url = url + "/" + params.eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getLoginToken(),
    },
    body: JSON.stringify(formData),
  });
  //console.log(response.status);
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Unable to fetch events." }), {
      status: response.status,
    });
  }

  return redirect("/events");
};
