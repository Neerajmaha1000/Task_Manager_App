const User = require("../../database/model/user.model");
const Task = require("../../database/model/task.model");

const addProject = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) return res.status(400).send("Please enter the project name");

    const project = await new Task({ name });
    await project.save();
    return res.status(200).send(project);
  } catch (error) {
    return res.status(400).send("Project creation failed");
  }
};

const getAllProjects = async (req, res) => {
  const { id } = req.query;
  try {
    const projects = await Task.find({ cretedBy: id });
    return res.status(200).send(projects);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const addTask = async (req, res) => {
  const { task, assingedTo, projectId, userId } = req.body;
  console.log('controller', req.body);
  try {
    if (!task || !projectId || !assingedTo) {
      return res.status(400).send("Please provide all required fields");
    }

    const project = await Task.findById(projectId);
    if (!project) return res.status(400).send("Project not found");

    console.log('projectdetail', project);
    
    const taskDetail = {
      task,
      status: "backlog",
      assignedTo: assingedTo,
      createdBy: userId, // Assuming you have access to the user
    };
    project.tasks.push(taskDetail);


    await project.save(); // Save updated project with new task
    return res.status(200).send(project);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Task addition failed");
  }
};

// Updated getAllTasks function to retrieve tasks for a given project
const getAllTasks = async (req, res) => {
  const { projID } = req.query;
  console.log("req query", req.query);
  try {
    const project = await Task.findById({ _id: projID });
    if (!project) return res.status(400).send("Project not found");
    const taskList = project.tasks;
    return res.status(200).send(taskList);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const editTask = async (req, res) => {};

 const statusChange = async (req, res) => {
  //console.log("neeraj", req.body);
  const { status, projId, taskindex, string } = req.body;

  try {
    if (!projId) {
      return res.status(400).send('Missing projectId in request');
    }

    let task = await Task.findByIdAndUpdate(
      { _id: projId},
      { $set: { 'tasks.$[elem].status': getUpdatedStatus(req.body.status, string) } },
      {
        arrayFilters: [{ 'elem.task': req.body.task }], // Filter based on task description
        new: true
      } 
    );
    console.log("taskOutput", task);

    if (!task) {
      return res.status(404).send('Task not found');
    }

    return res.send(task.tasks[taskindex]);
  } catch (error) {
    res.status(400).send(error);
  }
  
  function getUpdatedStatus(currentStatus, direction) {
    if (direction === "right") {
      switch (currentStatus) {
        case "backlog":
          return "todo";
        case "todo":
          return "doing";
        case "doing":
          return "done";
        default:
          return currentStatus;
      }
    } else {
      switch (currentStatus) {
        case "done":
          return "doing";
        case "doing":
          return "todo";
        case "todo":
          return "backlog";
        default:
          return currentStatus;
      }
    }
  }
};



const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await Task.findByIdAndDelete(id);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send("deleteFailed");
  }
};

module.exports = {
  addProject,
  getAllProjects,
  addTask,
  getAllTasks,
  editTask,
  statusChange,
  deleteTask,
};
