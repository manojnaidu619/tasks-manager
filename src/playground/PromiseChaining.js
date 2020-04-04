require("../db/mongoose")
const Task = require("../db/models/task")

// finds tasks by id and then returns all the tasks

Task.findByIdAndDelete("5e885a9dc24f0842efdd0d21").then((result) => {
    console.log(result)
    return Task.find({})
}).then((tasks) => {
    console.log(tasks)
}).catch((error) => console.log(error))
