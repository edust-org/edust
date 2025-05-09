import { Separator, Typography } from "@/components/ui"

import { PlayRoomSocket } from "./components/play-room-socket"

export default function Organizations() {
  return (
    <>
      <title>Organization Dashboard</title>
      <Typography variant="h1">Organizations Dashboard</Typography>
      <Separator className="my-8"/>
      <PlayRoomSocket />
    </>
  )
}
