import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-9xl text-red-500">404</h1>
        <p>Page not found</p>
        <div>
          <Link to={"/"}>
            <Button>Back to home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
