const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");


// Admin creates task
router.post(
  "/create",
  protect,
  adminOnly,
  createTask
);


// All users can view tasks
router.get(
  "/all",
  protect,
  getTasks
);


// Update task status
router.put(
  "/update/:id",
  protect,
  updateTaskStatus
);

module.exports = router;
