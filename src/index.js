const express = require("express")
const app = express()
const port = process.env.PORT || 3000

require("./db/mongoose")
const User = require("./db/models/user")
const Task = require("./db/models/task")
const userRouter = require("./routes/user")
const taskRouter = require("./routes/task")


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("Server is up on port", port)
})