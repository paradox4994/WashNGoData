const User = require("../models/user");
const Template = require("../models/Template");
const Project = require("../models/Project");
const fs = require("fs").promises;;

const projects = async (req, res) => {
  const { userID } = req.body;

  const user = await User.findById(userID);

  try {
    const project = await Project.find({ userId: user._id },{ _id: 1, name: 1, createdAt: 1 }).select({
      _id: 1,
      name: 1,
      createdAt: 1,
    });
 
    res.json(project);
  } catch (error) {
    console.log(error);
  }
};

const viewProjects = async (req, res) => {
  const { id } = req.body;
  const userProject = await Project.findById(id);
  res.json({
    project: userProject,
  });
};


const jsonData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null; // Or throw an error for better handling
  }
};

const saveProjects = async (req, res) => {
  const { name, description, tag, chart, userId, templateID } = req.body;
  const filePath = req.file.path;

  const exists = await Project.findOne({ name });
  if (exists) {
    return res.json({
      error: "Project name already exists",
    });
  }
  let rows = await jsonData(filePath)
  try {
    const project = await Project.create({
      name,
      description,
      tag,
      chart,
      userId,
      templateID,
      rows
    });
    if(project){
      res.json({
        message: "Project Saved"
      })
    }
  } catch (error) {
    console.log(error)
  }
};

const deleteProjects = async (req, res) => {
  const { id } = req.body;
  const deletedProject = await Project.findByIdAndDelete(id);

  if (!deletedProject) {
    res.json({ message: "Template Not Deleted" });
  }

  if (deletedProject) {
    res.json({ message: "Template Deleted" });
  }
};

module.exports = {
  projects,
  saveProjects,
  viewProjects,
  deleteProjects,
};
