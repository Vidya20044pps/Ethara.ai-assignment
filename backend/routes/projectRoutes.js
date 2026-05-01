const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");


// Admin creates project
router.post(
  "/create",
  protect,
  adminOnly,
  createProject
);


// All logged-in users can see projects
router.get(
  "/all",
  protect,
  getProjects
);

module.exports = router;