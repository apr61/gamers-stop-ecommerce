import "./breadCrumbs.css";
import { useLocation, Link } from "react-router-dom";

function BreadCrumbs() {
  const location = useLocation();
  let currentLink = "";

  const crumbsUpdated = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <Link
          key={crumb}
          className="breadcrumb__link"
          to={currentLink}
        >
          {crumb} <span>&gt;</span>
        </Link>
      );
    });
  const homeCrumb = (
    <Link key="home" className="breadcrumb__link" to="/">
      Home <span>&gt;</span>
    </Link>
  );
  const crumbs = [homeCrumb, ...crumbsUpdated];
  return <nav className="breadcrumbs">{crumbs}</nav>;
}

export default BreadCrumbs;
