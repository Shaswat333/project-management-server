const router = require("express").Router();
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");
const fileUpload = require("../config/cloudinary");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

//GET - gets all projects
router.get("/projects", async (req, res) => {
  try {
    const response = await Project.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//POST - create a project
router.post("/projects", isAuthenticated, async (req, res) => {
  try {
    console.log("user id", req.payload._id);
    const userId = req.payload._id;
    const { type,contact ,location, description, imageUrl } = req.body;
  
    const response = await Project.create({ type,contact ,location, description, imageUrl });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});
//DELETE - delete a project
router.delete("/project/:projectId", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.projectId);
    res
      .status(200)
      .json({ message: `Project with id ${req.params.projectId} was deleted` });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});


//GET ONE PROJECT
router.get("/project/:projectId", async (req, res) => {
  try {
    const response = await Project.findById(req.params.projectId);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//PUT PATCH
router.put("/project/:projectId", async (req, res) => {
  try {
    const { type, description } = req.body;
    const response = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        type,
        contacts,
        location,
        description,

      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(200).json({ message: e });
  }
});

//POST create tasks
router.post("/task", async (req, res) => {
  try {
    const { type,contact ,location, description, project } = req.body;
    //1. Create the task
    const response = await Task.create({ type ,contact ,location, description, project });

    //2. Update the project by pushing the task id to its tasks array
    const projectResponse = await Project.findByIdAndUpdate(
      project,
      {
        $push: { tasks: response._id },
      },
      { new: true }
    );
    res.status(200).json(projectResponse);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//Upload
router.post("/upload", fileUpload.single("filename"), async (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while returning the image path" });
  }
});

module.exports = router;
