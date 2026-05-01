const Task = require("../models/Task");

exports.getDashboardData = async (req, res) => {
  try {

    // Total Tasks
    const totalTasks = await Task.countDocuments();

    // Completed Tasks
    const completedTasks = await Task.countDocuments({
      status: "completed",
    });

    // Pending Tasks
    const pendingTasks = await Task.countDocuments({
      status: "pending",
    });

    // In Progress Tasks
    const inProgressTasks = await Task.countDocuments({
      status: "in-progress",
    });

    // Overdue Tasks
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" },
    });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
