import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"

type Status = "online" | "dnd" | "busy" | "offline"

interface AvatarWithStatusProps {
  src: string | null // Avatar image URL
  alt: string // Alt text for the image
  fallback?: string | null // Fallback text for the avatar
  status: Status // Status type
}

export function AvatarWithStatus({
  src,
  alt,
  fallback = null,
  status,
}: AvatarWithStatusProps) {
  const statusColors: Record<Status, string> = {
    online: "bg-green-500",
    dnd: "bg-red-500",
    busy: "bg-yellow-500",
    offline: "bg-gray-400",
  }

  return (
    <div className="flex select-none items-center gap-3">
      <div className="relative">
        <Avatar>
          {src && <AvatarImage src={src} alt={alt} />}
          <AvatarFallback>
            {fallback
              ? fallback
              : alt
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div
          className={`ring-background absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-[2px] ${
            statusColors[status]
          }`}
        ></div>
      </div>
    </div>
  )
}
