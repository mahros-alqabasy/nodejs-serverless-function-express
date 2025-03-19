import Task from "./Task.js";

class Database {
	constructor() {
		this.tasks = [];
		this.currentId = 1;
	}

	// Create a new task
	createTask(taskData) {
		// check task data
		if (taskData === null || taskData === undefined) {
			return null;
		}

		const newTask = new Task({ id: this.currentId++, ...taskData });

		// validate task data
		if (newTask === null || newTask === undefined) {
			return null;
		}

		// add task to database
		this.tasks.push(newTask);

		return newTask;
	}

	// Read a task by id
	getTaskById(id) {
		return this.tasks.find((task) => task.id === id);
	}

	// Read all tasks
	getAllTasks() {
		return this.tasks;
	}

	// Update a task by id
	updateTask(id, updatedTaskData) {
		const taskIndex = this.tasks.findIndex((task) => task.id === id);
		if (taskIndex === -1) {
			return null;
		}
		this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTaskData };
		return this.tasks[taskIndex];
	}

	// Delete a task by id
	deleteTask(id) {
		const taskIndex = this.tasks.findIndex((task) => task.id === id);
		if (taskIndex === -1) {
			return null;
		}
		const deletedTask = this.tasks.splice(taskIndex, 1);
		return deletedTask[0];
	}
}
const db = new Database();

// random data.tasks
db.createTask({ title: "Task 1", description: "Description 1" });
db.createTask({ title: "Task 2", description: "Description 2" });
db.createTask({ title: "Task 3", description: "Description 3" });

export default db;
