const User = require("../models/user");
const Template = require("../models/Template");
const Project = require("../models/Project");

const projects = async (req, res) => {
  const {userID} = req.body

    const user = await User.findById(userID);

    try {
        const template = await Project.find({userId: user._id})
        res.json(template);
    } catch (error) {
        console.log(error)
    }
};

const viewProjects = async(req,res) => {
  const {id} = req.body
  const userProject = await Project.findById(id)
  res.json({
    project: userProject
  })
}

const saveProjects = async (req, res) => {
  const { name, description, tag, userId, templateID } = req.body;

  const exists = await Project.findOne({ name });
  if (exists) {
    return res.json({
      error: "Project name already exists",
    });
  }
  try {
    const project = await Project.create({
      name,
      description,
      tag,
      userId,
      templateID,
    });
    if (project) {
      res.json({
        message: "Project Saved",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  projects,
  saveProjects,
  viewProjects
};
