import { Link } from "react-router-dom";
import { Button } from "../ui";
import assets from "@/assets/images";

export const Navbar = () => {
  return (
    <div className="shadow-sm">
      <div className="container">
        <nav className="flex items-center justify-between gap-4 py-2">
          <div>
            <Link to={"/"}>
              <img src={assets.logo} alt="Edust Brand Logo" width={120} />
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/playground"}>Playground</Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <Link to={"/auth/sign-in"}>
              <Button variant={"outline"}>Sign In</Button>
            </Link>
            <Link to={"/auth/sign-up"}>
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};
