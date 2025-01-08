import { Typography } from "./ui"
import packageInfo from "../../package.json"
import { ExternalLink } from "lucide-react"

export const GlobalTopNotificationBar = () => {
  return (
    <div className="flex items-center justify-center gap-2 bg-primary text-xs text-white dark:from-gray-100 dark:to-gray-200 dark:text-gray-950">
      <Typography affects="removePaddingMargin" className="leading-6">
        Edust - Development in Phase{" "}
      </Typography>
      <a
        href="https://github.com/edust-org/edust"
        target="_blank"
        className="flex items-center gap-px"
      >
        v{packageInfo.version} <ExternalLink className="size-3" />
      </a>
    </div>
  )
}
