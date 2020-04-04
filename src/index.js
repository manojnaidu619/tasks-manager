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
        .then((result) => res.status(201).send({message: "User Added", result: result._doc}))
        .catch((error) => res.status(400).send({error: error.message}))
})

app.post("/tasks", (req, res) => {
    const data = req.body
    const task = new Task(data)
    task.save()
        .then((result) => res.status(201).send({message: "Task Added", result: result._doc}))
        .catch((error) => res.status(400).send({error: error.message}))
})

app.get("/users", (req, res) => {
    User.find({})
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(500).send())
})

app.get("/users/:id", (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(404).send()
            }
            res.status(200).send(user)
        })
        .catch((error) => res.status(500).send(error))
})

app.get("/tasks", (req, res) => {
    Task.find({})
        .then((tasks) => res.status(200).send(tasks))
        .catch((error) => res.status(500).send(error))
})

app.get("/tasks/:id", (req, res) => {
    const id = req.params.id
    Task.findById(id)
        .then((task) => {
            if (!task) {
                return res.status(404).send()
            }
            res.status(200).send(task)
        })
        .catch((error) => res.status(500).send())
})

app.get("*", (req, res) => {
    res.send({error: "Invalid URI"})
})

app.listen(port, () => {
    console.log("Server is up on port", port)
})