import { Typography } from "./ui"
import packageInfo from "../../package.json"

export const GlobalTopNotificationBar = () => {
  return (
    <div className="bg-gradient-to-t from-gray-800 to-gray-950 dark:from-gray-100 dark:to-gray-200">
      <Typography className="px-2 py-1 text-center text-xs text-white dark:text-gray-950">
        Edust - Development in Phase{" "}
        <a
          href="https://github.com/edust-org/edust"
          target="_blank"
          className="hover:underline"
        >
          (Beta v{packageInfo.version})
        </a>
      </Typography>
    </div>
  )
}
