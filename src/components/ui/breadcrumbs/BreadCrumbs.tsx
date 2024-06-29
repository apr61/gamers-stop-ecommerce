import { useLocation, Link } from "react-router-dom";

function BreadCrumbs() {
  const location = useLocation();
  let currentLink = "";

  const crumbsUpdated = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      // For removing extra unique id in product slug for SingleProductPage
      if (crumb.split("-").length > 1) {
        crumb = crumb.split("-").slice(0, -1).join(" ");
      }
      currentLink += `/${crumb}`;
      return (
        <Link
          key={crumb}
          className="capitalize hover:underline hover:text-muted-foreground last:text-muted-foreground last:pointer-events-none"
          to={currentLink}
        >
          {crumb} <span>&gt;</span>
        </Link>
      );
    });

  const homeCrumb = (
    <Link
      key="home"
      className="capitalize hover:underline hover:text-muted-foreground"
      to="/"
    >
      Home <span>&gt;</span>
    </Link>
  );

  if(crumbsUpdated.length === 0){
    return
  }

  const crumbs = [homeCrumb, ...crumbsUpdated];
  return <nav className="m-4 flex gap-2 items-center flex-wrap">{crumbs}</nav>;
}

export default BreadCrumbs;
