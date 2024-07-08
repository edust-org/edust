import { Container } from "@/components";
import { Button, Typography } from "@/components/ui";
import { Link } from "react-router-dom";

export const SitesBuilder = () => {
  return (
    <div>
      <Container className="flex items-center gap-4 mt-8">
        <div className="p-4 shadow-sm bg-slate-50 hover:bg-slate-100 transition">
          <Typography variant="h2">This is site Home page</Typography>
          <Link to={"xidhome"}>
            <Button variant={"outline"}>Home</Button>
          </Link>
        </div>
        <div className="p-4 shadow-sm bg-slate-50 hover:bg-slate-100 transition">
          <Typography variant="h2">This is site About page</Typography>
          <Link to={"xidabout"}>
            <Button variant={"outline"}>About</Button>
          </Link>
        </div>
        <div className="p-4 shadow-sm bg-slate-50 hover:bg-slate-100 transition">
          <Typography variant="h2">This is site Service page</Typography>
          <Link to={"xidservices"}>
            <Button variant={"outline"}>Service</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};
