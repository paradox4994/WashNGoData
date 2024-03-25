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

  const exists = await Template.findOne({name})
  if(exists){
    return res.json({
      error: "Template name already exists"
  })
  }
  try {
    const template = await Template.create({
      name,
      description,
      userId,
      columns,
    });
    if(template){
      res.json({
        message: "Template Saved"
      })
    }
  } catch (error) {
    console.log(error);
  }
};

const viewTemplate = async (req,res) => {
    res.json("template sent by ekansh")
}

const deleteTemplate = async (req,res) => {
  const {id} = req.body
  const deletedTemplate = await Template.findByIdAndDelete(id);

  if(!deletedTemplate){
    res.json({"message": "Template Not Deleted"})
  }

  if(deletedTemplate){
    res.json({"message": "Template Deleted"})
  }
}

module.exports = {
  templates,
  saveTemplate,
  viewTemplate,
  deleteTemplate
};
