import { Link } from "react-router-dom";
import { Logo } from "@/assets/images";
import { Button } from "../ui";
import { Container } from "../container";

export const Navbar = () => {
  return (
    <div className="shadow-sm">
      <Container>
        <nav className="flex items-center justify-between gap-4 py-2">
          <div>
            <img src={Logo} alt="Edust Brand Logo" width={120} />
          </div>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
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
      </Container>
    </div>
  );
};
