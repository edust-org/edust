import { useBoolean } from "usehooks-ts";
import { parseISO, addHours, isAfter } from "date-fns";

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
import { useNavigate } from "react-router-dom";

const checkIsOpenOrgPopup = (auth) => {
  if (auth.isAuthenticated && auth?.user?.createdAt) {
    const userCreatedAt = auth?.user?.createdAt;
    const createdAt = parseISO(userCreatedAt);
    const expirationTime = addHours(createdAt, 24 * 7); // 24 * 7 = h * days
    const isExpires = isAfter(new Date(), expirationTime);

    const ls = JSON.parse(localStorage.getItem("orgPopup") || "{}");

    if (isExpires || auth?.organization?.id) {
      localStorage.removeItem("orgPopup");
      return false;
    }

    if (!isExpires && ls?.disable === undefined) {
      localStorage.setItem("orgPopup", JSON.stringify({ ...ls, isOpen: true }));
      return true;
    }
  }
};

export const HaveAnOrgAccount = ({ auth }) => {
  const navigate = useNavigate();
  const { value: openModal, setFalse: openModalFalse } = useBoolean(
    checkIsOpenOrgPopup(auth)
  );

  return (
    <>
      <AlertDialog open={openModal}>
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
              onClick={() => {
                openModalFalse();
                localStorage.setItem(
                  "orgPopup",
                  JSON.stringify({ isOpen: false, disable: true })
                );
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                localStorage.setItem(
                  "orgPopup",
                  JSON.stringify({ isOpen: false, disable: true })
                );
                navigate("/organizations/create");
                openModalFalse();
              }}
            >
              Create an Organization
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
