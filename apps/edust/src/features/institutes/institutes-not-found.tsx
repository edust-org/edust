import { useAppSelector } from "@/app/hooks"
import { Button, Card, Typography } from "@/components/ui"
import { useNavigate } from "react-router"

const InstituteNotFound = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated,
  )

  const navigate = useNavigate()
  return (
    <Card className="max-w-96 p-8">
      <Typography affects="removePaddingMargin" variant="h2">
        Institutes not found
      </Typography>
      <Typography affects="removePaddingMargin" variant="p">
        If you want to create a new institute you need to register here.
      </Typography>
      <Button
        className="mt-4 w-full"
        onClick={() => {
          if (!isAuthenticated) {
            return navigate("/auth/login")
          }

          navigate("/dashboard/institutes/create")
        }}
      >
        Create new one
      </Button>
    </Card>
  )
}

export default InstituteNotFound
