import { useAppSelector } from "@/app/hooks"
import { PrivateHome } from "./private-home"
import { GuestHome } from "./guest-home"

export const Home = () => {
  const { isAuthenticated } = useAppSelector((state) => state.authentication)
  return <>{isAuthenticated ? <PrivateHome /> : <GuestHome />}</>
}
