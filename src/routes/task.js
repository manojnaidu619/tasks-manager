const express = require("express")
const Task = require("../db/models/task")
const router = new express.Router()

router.patch("/tasks/:id", async(req, res) => {
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

router.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post("/tasks", async (req, res) => {
    const data = req.body
    const task = new Task(data)
    try {
        const result = await task.save()
        res.status(201).send({message: "Task Added", result: result._doc})
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get("/tasks/:id", async (req, res) => {
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

module.exports = router