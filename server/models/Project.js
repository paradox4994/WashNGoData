const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  tag: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  templateID: {type: Schema.Types.ObjectId, ref: 'Template', required: true},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rows: {
    "type": "object"
  },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
