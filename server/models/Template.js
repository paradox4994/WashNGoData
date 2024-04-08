const mongoose = require("mongoose");
const { Schema } = mongoose;

const columnSchema = new Schema({
  field: { type: String, required: true },
  description: String,
  unit: String,
});

const templateSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  columns: [columnSchema]
});

const TemplateModel = mongoose.model("Template", templateSchema);

module.exports = TemplateModel;
