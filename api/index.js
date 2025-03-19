/**
 * @fileoverview Main entry point for the Task Tracker API application.
 * @module app/index
 */

import path from "path";
import express from "express";
import database from "./models/Database.js";

// Config
const app = express();
app.use(express.static("public"));

/**
 * Middleware to parse JSON and URL-encoded data.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Root route.
 * @name get/
 * @function
 * @memberof module:app/index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

app.get(["/", "/api"], function (req, res) {
	res.sendFile("index.html", { root: __dirname + "/public/" });
});

/**
 * Route to get all tasks.
 * @name get/api/tasks
 * @function
 * @memberof module:app/index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object containing all tasks.
 */
app.get("/api/tasks", (req, res) => {
	res.status(200).json(database.getAllTasks());
});

/**
 * Route to get a task by ID.
 * @name get/api/tasks/:id
 * @function
 * @memberof module:app/index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object containing
 */
app.get("/api/tasks/:id", (req, res) => {
	const taskId = req.params.id;
	const task = database.getTaskById(taskId);
	if (task === null || task === undefined) {
		return res.status(404).json({ message: "Task not found" });
	}
	res.status(200).json(task);
});

/**
 * Route to create a new task.
 * @name post/api/create
 * @function
 * @memberof module:app/index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object with a success message.
 */
app.post("/api/create", (req, res) => {
	const body = req.body;
	const response = database.createTask({
		title: body.title,
		description: body.description,
		completed: body.completed,
	});

	if (response === null || response === undefined) {
		return res.status(400).json({ message: "Task not created" });
	}
	res.status(201).json({ message: "Task created successfully" });
});

/**
 * Route to delete a task by ID.
 * @name delete/api/delete/:id
 * @function
 * @memberof module:app/index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object with a success message.
 */
app.delete("/api/delete/:id", (req, res) => {
	const taskId = req.params.id;
	const response = database.deleteTask(taskId);
	if (response === null || response === undefined) {
		return res.status(404).json({ message: "Task not found" });
	}
	res.status(200).json({ message: "Task deleted successfully" });
});

/**
 * Route to update a task by ID.
 * @name put/api/update/:id
 * @function
 * @memberof module:app/index
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object with a success message.
 */
app.put("/api/update/:id", (req, res) => {
	const taskId = req.params.id;
	const updatedTask = req.body;
	const response = database.updateTask(taskId, updatedTask);
	if (response === null || response === undefined) {
		return res.status(404).json({ message: "Task not found" });
	}
	res.status(200).json({ message: "Task updated successfully" });
});

app.listen(1234, () => {});

export default app;
