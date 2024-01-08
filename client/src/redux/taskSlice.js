import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initalTask = localStorage.getItem("task")
  ? JSON.parse(localStorage.getItem("task"))
  : null;

const initialProject = localStorage.getItem("project")
  ? JSON.parse(localStorage.getItem("project"))
  : null;

const initialState = {
  TaskData: initalTask,
  Project: initialProject,
  AllTasks: {},
  Projects: {},
};
export const taskSlice = createSlice({
  name: "Task",
  initialState,

  reducers: {
    taskAddedSuccessfully: (state, action) => {
      state.TaskData = action.payload;
    },
    taskAddFailure: (state) => {
      return state;
    },
    getAllTaskSuccess: (state, action) => {
      state.AllTasks = action.payload;
    },
    getAllTaskFailure: (state) => {
      return state;
    },

    editTaskSuccess: (state, action) => {
      state.TaskData = action.payload;
    },

    deleteSuccess: (state, action) => {
      state.TaskData = action.payload;
    },
    deletefail: (state) => {
      return state;
    },
    addProjectSuccess: (state, action) => {
      state.Project = action.payload;
    },
    projectsAddFailure: (state) => {
      return state;
    },
    getProjectsSuccess: (state, action) => {
      state.Projects = action.payload;
    },
    getAllProjectsFailure: (state) => {
      return state;
    },
  },
});

export const {
  taskAddFailure,
  taskAddedSuccessfully,
  getAllTaskFailure,
  getAllTaskSuccess,
  deleteSuccess,
  deletefail,
  editTaskSuccess,
  addProjectSuccess,
  projectsAddFailure,
  getProjectsSuccess,
  getAllProjectsFailure,
} = taskSlice.actions;

export default taskSlice.reducer;

// actions for projects
export const addProject = (name) => async (dispatch) => {
  const response = await axios.post("http://localhost:4000/task/projects/add", {
    name,
  });
  if (response) {
    dispatch(addProjectSuccess(response.data));
    window.location.reload();
    toast.success("Project added successfully");
  } else {
    dispatch(projectsAddFailure());
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    console.log("reach?", "1");
    const response = await axios.get("http://localhost:4000/task/projects");
    if (response) {
      dispatch(getProjectsSuccess(response.data));
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export const addTask = (task, assingedTo, projectId, userId) => async (dispatch) => {
    const taskData = {
      task,
      assingedTo,
      projectId,
      userId,
    };
    console.log("neeraj", taskData);
    try {
      const response = await axios.post(
        "http://localhost:4000/task/tasks",
        taskData
      );
      if (response) {

        dispatch(taskAddedSuccessfully(response.data));
        toast.success("task added successfully");
        
      } else {
        dispatch(taskAddFailure());
      }
    } catch (error) {
      console.error(error); 
      dispatch(taskAddFailure());
      toast.error("An error occurred adding the task"); 
    }
  };

export const getAllTasks = (token, id, projID) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      projID,
    },
  };
  console.log("id", id);
  console.log("proj Name", projID);
  try {
    const response = await axios.get(
      `http://localhost:4000/task/tasks/${projID}`,
      config
    );

    if (response) {
      console.log("taskData", response.data);
      dispatch(getAllTaskSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      dispatch(getAllTaskFailure());
    }
  }
};

export const arrowClick = (item, projId, taskindex, string) => async () => {
  let taskData = {
    task: item.task,
    status: item.status,
    projId,
    taskindex,
    string,
  };
  console.log("taskslice Arrow", taskData);
  try {
    let response = await axios.put(
      `http://localhost:4000/task/tasks/${projId}/${taskindex}/status`,
      taskData
    );

    if (response) {
      //window.location.reload();
      console.log("res", response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  let res = await axios.delete(`http://localhost:4000/task/${id}`);

  if (res) {
    dispatch(deleteSuccess());
    toast.success("task deleted successfully");

    window.location.reload();
  } else {
    dispatch(deletefail());
  }
};
