require("./db/mongoose")
const User = require("./db/models/user")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post("/users", (req, res) => {
    const data = req.body
    const user = new User(data)
    user.save().then((result) => res.send(result)).catch((error) => res.send(error))
})

app.listen(port, () => {
    console.log("Server is up on port", port)
})