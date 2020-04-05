require("./db/mongoose")
const User = require("./db/models/user")
const Task = require("./db/models/task")

const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post("/users", async (req, res) => {
    const data = req.body
    const user = new User(data)
    try {
        const result = await user.save()
        res.status(201).send({message: "User Added", result: result._doc})
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})

app.post("/tasks", async (req, res) => {
    const data = req.body
    const task = new Task(data)
    try {
        const result = await task.save()
        res.status(201).send({message: "Task Added", result: result._doc})
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({}) 
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

app.get("/users/:id", async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)   
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.patch("/users/:id", async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)        
    } catch (e) {
        res.status(500).send(e)
    }

})

app.patch("/tasks/:id", async(req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get("*", (req, res) => {
    res.send({error: "Invalid URI"})
})

app.listen(port, () => {
    console.log("Server is up on port", port)
})