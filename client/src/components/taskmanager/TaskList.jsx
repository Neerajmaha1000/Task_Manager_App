import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks, getProjects } from '../../redux/taskSlice';
import ListCard from './ListCard';

const TaskList = () => {
	const auth = useSelector((state) => state.auth);
	const tasks = useSelector((state) => state.task);
	const Projects = useSelector((state) => state.task.Projects);

	const { currentUser } = auth;
	const { AllTasks } = tasks;

	const dispatch = useDispatch();

	//get projects
	useEffect(() => {
		dispatch(getProjects())
			.catch((error) => {
				console.error('Failed to fetch projects:', error);
			});

	}, [dispatch]);


	useEffect(() => {
		dispatch(getAllTasks(currentUser.token, currentUser.id));
	}, [dispatch, currentUser.token, currentUser.id]);

	const [state, setState] = useState('');

	const handleChange2 = (e) => {
		console.log('after selection', e.target.value);
		setState(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(getAllTasks(currentUser.token, currentUser.id, state));
	};

	const handleChildChange = () => {
		// Call API here
		dispatch(getAllTasks(currentUser.token, currentUser.id, state));
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-4">
			{Projects && Projects.length > 0 ? (
				<select onChange={handleChange2} name='assignedTo' defaultValue={state} value={state.projName} className="px-3 py-2 border rounded focus:outline-none focus:border-blue-500">
					{Projects.map((emp) => {
						return (<><option key={emp.name} value={emp._id}>{emp.name}</option></>)
					})}
				</select>
			) : (
				<p>Loading projects...</p>
			)}
			<button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
				Select Project
			</button>
			<table className="w-full divide-y divide-gray-200">
				<thead>
					<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
						{/* <th className="py-3 px-6 text-left">ID</th> */}
						<th className="py-3 px-6 text-left">Task Name</th>
						<th className="py-3 px-6 text-left">Assinged to</th>
						<th className="py-3 px-6 text-left">Status</th>
						<th className="py-3 px-6 text-center">Action</th>
					</tr>
				</thead>
				{AllTasks ? (
					< tbody >
						{
							Object.values(AllTasks).map((item, index) => (
								<ListCard key={item._id} projId={state} index={index} item={item} onValueChange={handleChildChange} />
							))
						}
					</tbody>
				) : (
					<p>Loading projects...</p>
				)}
			</table>
		</div >
	);
};

export default TaskList;
