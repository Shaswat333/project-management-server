const { Schema, model } = require("mongoose");


const projectSchema = new Schema({
  type: String,
  contact: String,
  location: String,
  description: String,
  imageUrl: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

//Translates in a projects collection on mongodb
module.exports = model("Project", projectSchema);
