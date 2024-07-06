import { useBoolean } from "usehooks-ts";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import { Logo } from "@/assets/images";

import { CreateOrganizationForm } from "../create-organization-form";

export const HaveOrganization = () => {
  const { value: isShowForm, setTrue: isShowFormTrue } = useBoolean(false);
  const { value: openModal, setFalse: openModalFalse } = useBoolean(
    JSON.parse(localStorage.getItem("isOrgAcc") == "true" ? "true" : "false")
  );

  return (
    <>
      <AlertDialog
        open={openModal}
        defaultOpen={
          JSON.parse(localStorage.getItem("isOrgAcc") ?? "false") || false
        }
      >
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          {isShowForm ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">
                  Create a free new organization
                </AlertDialogTitle>
                <img src={Logo} alt="" width={180} className="mx-auto" />
              </AlertDialogHeader>

              <CreateOrganizationForm>
                <AlertDialogCancel
                  onClick={() => {
                    localStorage.setItem("isOrgAcc", JSON.stringify(false));
                    openModalFalse();
                  }}
                >
                  Cancel
                </AlertDialogCancel>
              </CreateOrganizationForm>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you have an organization?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  If you don’t have an organization yet, you can create one and
                  build a customizable website for your organization.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    localStorage.setItem("isOrgAcc", JSON.stringify(false));
                    openModalFalse();
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={isShowFormTrue}>
                  Create an Organization
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
