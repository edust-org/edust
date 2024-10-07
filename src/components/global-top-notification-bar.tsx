import { Typography } from "./ui";

export const GlobalTopNotificationBar = () => {
  return (
    <div className="bg-gradient-to-t from-gray-800 to-gray-950">
      <Typography className="px-2 py-1 text-center text-xs text-white">
        Edust - Development in Progress{" "}
        <a
          href="https://github.com/edust-org/edust"
          className="hover:underline"
        >
          (v0.0.0)
        </a>
      </Typography>
    </div>
  );
};
