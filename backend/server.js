import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import adminRouter from "./routes/adminRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = 4000


// middlewares
app.use(express.json())
app.use(cors())
// cors is used to access the data from backend to frontend

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter);
app.use("/api/admin",adminRouter)


// get is http method. using this we can request the data from server
app.get("/", (req, res) => {
    res.send("API Working")
  });


// running express server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`))