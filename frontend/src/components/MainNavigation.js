import classes from "./MainNavigation.module.css";
import { NavLink, Form, useRouteLoaderData } from "react-router-dom";

function MainNavigation() {
  //const [activeLink, setActiveLink] = useState(null);
  //const loc = useLocation();

  // useEffect(() => {
  //   setActiveLink(loc.pathname);
  //   console.log(loc.pathname);
  // }, [loc]);
  const token = useRouteLoaderData("root");

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>|</li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>|</li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          <li>|</li>
          <li>
            {token ? (
              <Form action="logout" method="post">
                <button className={classes.button} type="submit">
                  Logout
                </button>
              </Form>
            ) : (
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
