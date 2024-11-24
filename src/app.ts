import express from "express"
import "reflect-metadata"
import userRouter from "./routes/user.routes"
import authRouter from "./routes/auth.routes"
import submissionRouter from './routes/submission.routes'
import adminRouter from './routes/admin.routes'
import { AppDataSource } from "./config/data-source"
import "dotenv/config"
import cors from "cors"
import { errorHandler } from "./middleware/error.middleware"
import { User } from "./schemas/User"
import { encrypt } from "./helpers/helpers"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use('/api', submissionRouter)
app.use('/api/admin', adminRouter)

app.use(errorHandler)

/**
 * Function to create a default admin user if it doesn't exist.
 */
const createDefaultAdmin = async () => {
  const adminEmail = "admin@example.com"
  const adminPassword = "admin"
  const existingAdmin = await User.findOne({ where: { email: adminEmail } })

  if (!existingAdmin) {
    const encryptedPassword = await encrypt.encryptpass(adminPassword)
    const admin = new User()
    admin.firstName = "Admin"
    admin.lastName = "User"
    admin.email = adminEmail
    admin.phone = "0000000000"
    admin.password = encryptedPassword
    admin.role = "Admin"
    await User.save(admin)
    console.log("Default admin user created")
  } else {
    console.log("Default admin user already exists")
  }
}

/**
 * Initializes the data source and starts the Express server.
 */
AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!")
    await createDefaultAdmin()
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch(error => console.log(error))