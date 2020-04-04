require("./db/mongoose")
const User = require("./db/models/user")
const Task = require("./db/models/task")

const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post("/users", (req, res) => {
    const data = req.body
    const user = new User(data)
    user.save()
        .then((result) => res.send({message: "User Added", result: result._doc}))
        .catch((error) => res.status(400).send({error: error.message}))
})

app.post("/tasks", (req, res) => {
    const data = req.body
    const task = new Task(data)
    task.save()
        .then((result) => res.send({message: "Task Added", result: result._doc}))
        .catch((error) => res.status(400).send({error: error.message}))
})

app.listen(port, () => {
    console.log("Server is up on port", port)
})