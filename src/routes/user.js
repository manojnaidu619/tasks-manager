const express = require("express")
const router = new express.Router()
const User = require("../db/models/user")

router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}) 
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get("/users/:id", async(req, res) => {
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

router.patch("/users/:id", async (req, res) => {
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

router.delete("/users/:id", async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post("/users", async (req, res) => {
    const data = req.body
    const user = new User(data)
    try {
        const result = await user.save()
        res.status(201).send({message: "User Added", result: result._doc})
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})


module.exports = router

