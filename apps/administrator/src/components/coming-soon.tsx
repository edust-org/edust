"use client"

import { Button, Typography } from "@edust/ui"
import { useRouter } from "next/navigation"
import { TbPlanet } from "react-icons/tb"

type ComingSoonProps = {
  className?: string
}

export const ComingSoon = ({ className }: ComingSoonProps) => {
  const router = useRouter()
  return (
    <div className={`h-svh ${className}`}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <TbPlanet size={72} />
        <Typography
          className="text-4xl font-bold leading-tight"
          affects="removePaddingMargin"
        >
          Coming Soon 👀
        </Typography>
        <Typography
          className="text-muted-foreground mb-4 text-center"
          affects="removePaddingMargin"
        >
          This page has not been created yet. <br />
          Stay tuned though!
        </Typography>
        <Button onClick={() => router.back()} size={"lg"}>
          Back
        </Button>
      </div>
    </div>
  )
}
