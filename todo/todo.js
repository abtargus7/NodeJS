import fs from "fs"
const file = "./tasks.json"

const getTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(file)
        // console.log("data buffer ", dataBuffer)
        const dataJSON = dataBuffer.toString()
        // console.log("data Json: ", dataJSON)
        // console.log(JSON.parse(dataJSON))
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks)
    fs.writeFileSync(file, dataJSON)
}

const addTask = (task) => {
    const tasks = getTasks()
    tasks.push({task})
    saveTasks(tasks)
    console.log("Task added", task)

}

const listTasks = () => {
    const list = getTasks()

    list.forEach((task, index) => console.log(`${index + 1} - ${task.task}`))
}

const removeTask = (taskIndex) => {
    const tasks = getTasks()
    const filteredTasks = tasks.filter((task, index) => index != taskIndex)
    saveTasks(filteredTasks)

    console.log("removed task - ", tasks[taskIndex])

    console.log("New List ->")
    listTasks()
}

const command = process.argv[2]
const argument = process.argv[3]

if(command === "add") {
    addTask(argument)
} else if (command === "list") {
    listTasks()
} else if (command === "remove") {
    removeTask(parseInt(argument))
} else {
    console.log("command not found")
}