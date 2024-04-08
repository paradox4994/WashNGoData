const User = require("../models/user");
const Project = require("../models/Project");

const users = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

const viewProjects = async (req, res) => {
    try {
      const { userId } = req.body;
      const userProjects = await Project.find({ userId: userId }); 
      res.json({
        projects: userProjects,
      });
    } catch (error) {
      console.error(error);
    }
  };

const deleteUsers = async (req, res) => {
  const { id } = req.body;
  const deletedProject = await User.findByIdAndDelete(id);

  if (!deletedProject) {
    res.json({ message: "User Not Deleted" });
  }

  if (deletedProject) {
    res.json({ message: "Template Deleted" });
  }
};

module.exports = {
  users,
  viewProjects,
  deleteUsers,
};
