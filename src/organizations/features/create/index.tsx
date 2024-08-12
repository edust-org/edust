import { lazy } from "react";
import { Typography } from "@/components/ui";
import assets from "@/assets/images";

const CreateOrganizationForm = lazy(() =>
  import("./create-organization-form").then((module) => ({
    default: module.CreateOrganizationForm,
  }))
);

export const CreateOrganization = () => {
  return (
    <>
      <div className="flex items-center gap-4 h-screen overflow-hidden">
        <div className="hidden md:block md:h-full flex-1 relative">
          <img
            src={assets.imgCreateOrganizations}
            alt=""
            className="h-full w-full object-cover grayscale"
          />
          <div className="bg-black/35 h-full w-full absolute inset-0 backdrop-blur-sm"></div>
          <div className="absolute inset-0 m-4 md:m-8 xl:m-16 2xl:m-24 overflow-y-scroll no-scrollbar z-10 text-white">
            <div className="space-y-8">
              <div>
                <Typography variant="h1">
                  Why Create an Organization?
                </Typography>
                <Typography>
                  Creating an organization on our platform comes with numerous
                  benefits. Whether you're representing an educational
                  institution, a college, or a school, here’s how you can
                  benefit?
                </Typography>
              </div>
              <Typography variant="h2">Benefits</Typography>
              <div>
                <Typography variant="h3">Increased Visibility:</Typography>
                <Typography variant="list" className="list-disc">
                  <li>
                    Reach a wider audience by having a dedicated online
                    presence.
                  </li>
                  <li>
                    Share your mission, programs, and achievements with the
                    world.
                  </li>
                </Typography>
              </div>
              <div>
                <Typography variant="h3">Customizable Landing Page:</Typography>
                <Typography variant="list">
                  <li>
                    Use our intuitive page builder to design a unique landing
                    page.
                  </li>
                  <li>
                    Reflect your organization’s branding with customizable
                    layouts and themes.
                  </li>
                </Typography>
              </div>
              <div>
                <Typography variant="h3">Efficient Communication:</Typography>
                <Typography variant="list">
                  <li>
                    Keep your audience informed with news, events, and
                    announcements.
                  </li>
                  <li>
                    Provide detailed contact information to facilitate easy
                    communication.
                  </li>
                </Typography>
              </div>
              <div>
                <Typography variant="h3">Public Access:</Typography>
                <Typography variant="list">
                  <li>
                    Make your organization's information accessible to the
                    public.
                  </li>
                  <li>
                    Allow potential students, partners, and stakeholders to
                    learn more about you.
                  </li>
                </Typography>
              </div>
              <div>
                <Typography variant="h3">Upcoming Features:</Typography>
                <Typography variant="list">
                  <li>
                    Be the first to access new features and tools as they become
                    available.
                  </li>
                  <li>
                    Enhance your organization's page with the latest
                    functionalities.
                  </li>
                </Typography>
              </div>

              <br />

              <Typography variant="h1">
                How to Create an Organization
              </Typography>
              <div>
                <Typography variant="h3">Log In to Your Account:</Typography>
                <Typography variant="list">
                  <li>
                    Ensure you are logged in. If you don't have an account,
                    register here.
                  </li>
                </Typography>
              </div>
              <div>
                <Typography variant="h3">
                  Access the Organization Creation Page:
                </Typography>
                <Typography variant="list">
                  <li>
                    Click on the 'Create Organization' button in your dashboard.
                  </li>
                </Typography>
              </div>
              <div>
                <Typography variant="h3">
                  Fill in Organization Details:
                </Typography>
                <Typography variant="list">
                  <li>
                    Complete the form below with the necessary information.
                  </li>
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[550px] p-4 md:pe-8 flex-1 xl:flex-none 2xl:p-24 2xl:max-w-[800px]">
          <img src={assets.logo} alt="" width={180} className="mx-auto" />
          <Typography variant="h2" className="text-center">
            Create a free new organization
          </Typography>
          <CreateOrganizationForm />
        </div>
      </div>
    </>
  );
};
