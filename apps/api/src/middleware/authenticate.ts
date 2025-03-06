import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
import { statusCodes, statusMessages } from "http-status-kit"

export const authenticate = (token: "tokenForUser" | "tokenForOrganizer") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers["authorization"]?.split(" ")[1]
    if (accessToken !== token) {
      return next(
        createHttpError(statusCodes.UNAUTHORIZED, statusMessages.UNAUTHORIZED),
      )
    }
    next()
  }
}
