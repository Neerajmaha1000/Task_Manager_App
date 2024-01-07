import { useState, useEffect } from 'react';
import { addTask, getProjects } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
//import { toast } from "react-toastify";


const AddTask = () => {
	//const [projList, setProjList] = useState([]);
	const auth = useSelector((state) => state.auth);
	const Projects = useSelector((state) => state.task.Projects);
	const { currentUser } = auth;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProjects())
			.catch((error) => {
				console.error('Failed to fetch projects:', error);
			});
	}, [dispatch]);


	console.log('proj0', Projects);
	const [task, setTask] = useState('');
	const [projectAssigned, setProjectAssigned] = useState('');
	const [assignedTo, setAssignedTo] = useState('');

	const handleChange = (e) => {
		setTask(e.target.value);
	};

	const handleChange1 = (e) => {
		setAssignedTo(e.target.value);
		console.log('handlechange1', e.target.value);
	};

	const handleChange2 = (e) => {
		setProjectAssigned(e.target.value);
		console.log('handlechange2', e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addTask(task, assignedTo, projectAssigned, currentUser.id))
			.then(() => {
				//toast.success("Task added successfully")
			})
			.catch((err) => {
				console.error(err);
				//toast.error("Task addition failed.");
			})
		console.log('dispatch', task, assignedTo, projectAssigned, currentUser.id);
	};

	const EmpList = ['None', 'Prem Pawar', 'Neeraj Mahajan', 'Durgesh Patil', 'Piyush Chaudhary'];

	return (
		<div className="p-3 bg-white rounded-lg shadow-md">
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="task" className="block text-gray-700 font-bold mb-2">Create New Task</label>
					<input
						type="text"
						id="task"
						name="task"

						//value={state.task}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className='flex justify-between'>
					<div className="mb-4">
						<label htmlFor="task" className="block text-gray-700 font-bold mb-2">task to project</label>
						{Projects && Projects.length > 0 ? (
							<select onChange={handleChange2} name='projectAssigned' className="px-3 py-2 border rounded focus:outline-none focus:border-blue-500">
								{Projects.map((emp) => {
									return (<><option key={emp.name} value={emp._id}>{emp.name}</option></>)
								})}
							</select>
						) : (
							<p>Loading projects...</p>
						)}
					</div>
					<div className="mb-4">
						<label htmlFor="task" className="block text-gray-700 font-bold mb-2">Assign To</label>
						<select onChange={handleChange1} name='assignedTo' className="px-3 py-2 border rounded focus:outline-none focus:border-blue-500">
							{EmpList.map((emp) => {
								return (<><option key={emp} value={emp}>{emp}</option></>)
							})}
						</select>
					</div>
				</div>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
					Create Task
				</button>
			</form>
		</div>
	);
};

export default AddTask;
