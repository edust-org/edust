import { Logo } from "@/assets/images";
import { Navbar } from "@/components";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Typography,
} from "@/components/ui";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <Typography variant="h1">Welcome to our Edust!</Typography>
        <img src={Logo} alt="" />
        <Button>Get Started</Button>

        <AlertDialog
          defaultOpen={
            JSON.parse(localStorage.getItem("isOrgAcc") ?? "false") || false
          }
        >
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do you have an organization?</AlertDialogTitle>
              <AlertDialogDescription>
                If you don’t have an organization yet, you can create one and
                build a customizable website for your organization.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() =>
                  localStorage.setItem("isOrgAcc", JSON.stringify(false))
                }
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  localStorage.setItem("isOrgAcc", JSON.stringify(false))
                }
              >
                Create an Organization
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};
