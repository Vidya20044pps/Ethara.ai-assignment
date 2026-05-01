const Task = require("../models/Task");


// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      project,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      project,
      dueDate,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "title");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
