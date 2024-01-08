const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  // ... other project fields
  tasks: [
    {
      task: { type: String, required: true },
      status: {
        type: String,
        enum: ["backlog", "todo", "doing", "done"],
        default: "backlog",
      },
      assignedTo: { type: String, required: true }, // Assignee for each task
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
 
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
