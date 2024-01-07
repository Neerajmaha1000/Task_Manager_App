import { useState } from 'react';
import { addProject } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddProject = () => {
    const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;
	const [state, setState] = useState({
		project: '',
	});

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addProject(state.project, currentUser.id));
		setState({
			project: '',
		});
	};


    return (
      <div className="p-3 bg-white rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                      <label htmlFor="project" className="block text-gray-700 font-bold mb-2">Create New Project</label>
                      <input
                          type="text"
                          id="project"
                          name="project"
                          value={state.project}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                  </div>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-900 text-sm text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
                      Create Project
                  </button>
              </form>
          </div>
    )
  }
  
  export default AddProject;