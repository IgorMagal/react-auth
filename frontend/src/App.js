// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements) DONE--
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages DONE--
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components DONE --
// 4. Add properly working links to the MainNavigation DONE --
// 5. Ensure that the links in MainNavigation receive an "active" class when active DONE --
// 6. Output a list of dummy events to the EventsPage DONE --
//    Every list item should include a link to the respective EventDetailPage DONE --
// 7. Output the ID of the selected event on the EventDetailPage DONE--
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components DONE--
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import EventsPage, { EventsLoader as Loader } from "./pages/EventsPage";
import EventDetailPage, {
  EventDetailLoader as DetailsLoader,
  action as EventDeleteAction,
} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventRootPage from "./pages/EventRootPage";
import { action as EventAction } from "./components/EventForm";
import NewsletterPage, {
  action as NewsletterAction,
} from "./pages/NewsletterPage";
import AuthenticationPage, {
  action as AuthAction,
} from "./pages/AuthenticationPage";
import { action as LogoutAction } from "./pages/Logout";
import { checkForToken, getLoginToken } from "./util/authFunctions";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      loader: getLoginToken,
      id: "root",
      children: [
        { index: true, element: <HomePage /> },
        { path: "auth", element: <AuthenticationPage />, action: AuthAction },
        { path: "logout", action: LogoutAction },
        {
          path: "events",
          element: <EventRootPage />,

          // errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: Loader,
            },
            {
              path: ":eventId",
              loader: DetailsLoader,
              id: "eventId",
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                  action: EventDeleteAction,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                  action: EventAction,
                  loader: checkForToken,
                },
              ],
            },
            {
              path: "new",
              element: <NewEventPage />,
              action: EventAction,
              loader: checkForToken,
            },
          ],
        },
        {
          path: "newsletter",
          element: <NewsletterPage />,
          action: NewsletterAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
