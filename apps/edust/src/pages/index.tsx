import { lazy } from "react";

export const NotFound = lazy(() =>
  import("./not-found").then((module) => ({ default: module.NotFound })),
);
export const ContactUs = lazy(() =>
  import("./contact-us").then((module) => ({ default: module.ContactUs })),
);

export const AboutUs = lazy(() =>
  import("./about-us").then((module) => ({ default: module.AboutUs })),
);

export const Playground = lazy(() =>
  import("./playground").then((module) => ({ default: module.Playground })),
);
