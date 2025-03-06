import cookieParser from "cookie-parser"
import cors from "cors"
import express, { NextFunction, Request, Response } from "express"

import apiRoutes from "./modules"

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api", apiRoutes)

app.get("/", (_req: Request, res: Response) => {
  res.send(`<h1>Fake api!</h1>`)
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message || err,
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
