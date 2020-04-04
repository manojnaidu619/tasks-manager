require("../db/mongoose")
const Task = require("../db/models/task")

const deleteTaskAndList = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    console.log("task",task)
    const result = await Task.find({})
    console.log("result",result)
    return result
}

deleteTaskAndList("5e886e0997b7065338fd4ba1").then((result) => {
    console.log("result from call",result)
}).catch((e) => console.log("error",e))
