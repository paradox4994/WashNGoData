const User = require("../models/user");
const Template = require("../models/Template");

const templates = async (req, res) => {

    const {userID} = req.body

    const user = await User.findById(userID);

    try {
        const template = await Template.find({userId: user._id})
        res.json(template);
    } catch (error) {
        console.log(error)
    }
};

const saveTemplate = async (req, res) => {
  const { name, description, userId, columns } = req.body;

  try {
    const template = await Template.create({
      name,
      description,
      userId,
      columns,
    });
  } catch (error) {
    console.log(error);
  }
};

const viewTemplate = async (req,res) => {
    res.json("template")
}

module.exports = {
  templates,
  saveTemplate,
  viewTemplate
};
