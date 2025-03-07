import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
import { statusCodes, statusMessages } from "http-status-kit"

export const authenticate = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers["authorization"]?.split(" ")[1]
    if (!accessToken) {
      return next(
        createHttpError(statusCodes.UNAUTHORIZED, statusMessages.UNAUTHORIZED),
      )
    }
    next()
  }
}

export const authenticateForOrg = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1]
  if (!accessToken || accessToken !== "tokenForOrganizer") {
    return next(
      createHttpError(statusCodes.UNAUTHORIZED, statusMessages.UNAUTHORIZED),
    )
  }

  next()
}
