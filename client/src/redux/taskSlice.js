import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initalTask = localStorage.getItem("task")
  ? JSON.parse(localStorage.getItem("task"))
  : null;


const initialProject = localStorage.getItem("project") ? JSON.parse(localStorage.getItem("project")) : null  

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
    getProjectsSuccess: (state, action) => {
      state.Projects = action.payload;
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
  getProjectsSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;

// actions for projects
export const addProject = (name) => async (dispatch) => { 
  console.log('test', name);
  const response = await axios.post("http://localhost:4000/task/projects/add", {
    name,
  });
  if (response) {
    dispatch(addProjectSuccess(response.data));
    toast.success("Project added successfully");
  } else {
    dispatch(taskAddFailure()); // Use a generic failure action for now
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4000/task/projects");
    if (response) {
      dispatch(getProjectsSuccess(response.data));
      console.log('projectList', response)
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export const addTask = (task, assingedTo, id) => async (dispatch) => {
  const taskData = {
    task,
    assingedTo,
    id,
  };
  const response = await axios.post("http://localhost:4000/task/tasks", taskData);
  if (response) {
    localStorage.setItem("task", JSON.stringify(response.data));

    dispatch(taskAddedSuccessfully(response.data));
    toast.success("task added successfully");
    window.location.reload();
  } else {
    dispatch(taskAddFailure());
  }
};

export const getAllTasks = (token, id, projectId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id,
    },
  };

  try {
    const response = await axios.get(
      `http://localhost:4000/task//tasks/${projectId}`,
      config
    );

    if (response) {
      dispatch(getAllTaskSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      dispatch(getAllTaskFailure());
    }
  }
};

export const arrowClick = (item, string) => async () => {
  let taskData = {
    id: item._id,
    status: item.status,
    string,
  };

  try {
    let response = await axios.put(
      `http://localhost:4000/task/${taskData.id}`,
      taskData
    );

    if (response) {
      window.location.reload();
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
