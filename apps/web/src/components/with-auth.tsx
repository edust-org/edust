import { getCookie } from "cookies-next"

import React, { JSX } from "react"

interface WithAuthProps {
  [key: string]: unknown
}

export function withAuth<P extends WithAuthProps>(
  Component: React.ComponentType<P>,
) {
  const Wrapper = (props: P): JSX.Element => {
    // If no token is found, do not render the component yet
    if (!getCookie("accessToken")) {
      return <></>
    }

    return <Component {...props} />
  }

  return Wrapper
}
