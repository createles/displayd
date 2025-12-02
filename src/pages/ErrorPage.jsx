import { useRouteError } from "react-router";
import { Link } from "react-router";

function ErrorPage() {
  const error = useRouteError(); // accesses error
  console.error(error); // logs the error for debugging

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>{error?.statusText || error?.message || "Page Not Found"}</i>
      </p>
      <Link to="/">Go back home</Link>
    </div>
  )
}

export default ErrorPage;