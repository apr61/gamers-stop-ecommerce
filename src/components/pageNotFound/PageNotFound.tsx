import { Link } from "react-router-dom";
import "./pageNotFound.css";
const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="page-not-found-wrapper">
        <h1 className="page-not-found__title">Page Not Found</h1>
        <Link to="/" className="page-not-found__link">
          &lt; Go Back To Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
