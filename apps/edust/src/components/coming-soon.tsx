import { TbPlanet } from "react-icons/tb"
import { Button, Typography } from "@/components/ui"
import { useNavigate } from "react-router"

interface ComingSoonProps {
  className?: string
}

export const ComingSoon = ({ className }: ComingSoonProps) => {
  const navigate = useNavigate()
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
          className="mb-4 text-center text-muted-foreground"
          affects="removePaddingMargin"
        >
          This page has not been created yet. <br />
          Stay tuned though!
        </Typography>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div>
  )
}
