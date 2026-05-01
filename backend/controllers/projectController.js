const Project = require("../models/Project");


// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    const project = await Project.create({
      title,
      description,
      members,
      admin: req.user.id,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("admin", "name email")
      .populate("members", "name email");

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
