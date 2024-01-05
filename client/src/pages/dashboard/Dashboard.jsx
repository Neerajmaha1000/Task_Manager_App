import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllTasks } from '../../redux/taskSlice';


const Dashboard = () => {
	const tasklist = useSelector((state) => state.task);
	const { AllTasks } = tasklist;
	const user = useSelector((state) => state.auth);
	const { currentUser } = user;

	let pendingTask = [];
	let completedTask = [];
	let backlogTask = [];
	let doingTask = [];
	for (let i = 0; i < AllTasks.length; i++) {
		if (AllTasks[i].status === 'todo') {
			pendingTask.push(AllTasks[i]);
		} else if (AllTasks[i].status === 'done') {
			completedTask.push(AllTasks[i]);
		} else if (AllTasks[i].status === 'backlog') {
			backlogTask.push(AllTasks[i]);
		} else if (AllTasks[i].status === 'doing') {
			doingTask.push(AllTasks[i]);
		}
	}

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllTasks(currentUser.token, currentUser.id));
	}, [dispatch, currentUser.token, currentUser.id]);

	return (
		<div className="container mx-auto p-4 flex">
			<div className="w-1/4 bg-gray-50 border-gray-400">
				<Sidebar />
			</div>
			<div className="w-3/4 p-4">
				<h2 className="text-2xl font-bold mb-6">SmartDings Dashboard</h2>
				<div className="grid grid-cols-2 gap-4">
					<div className="bg-blue-100 rounded-lg shadow-md p-4">
						<h3 className="text-lg font-semibold mb-2">Backlog</h3>
						<p className="text-xl font-bold">{backlogTask.length}</p>
					</div>
					<div className="bg-pink-100 rounded-lg shadow-md p-4">
						<h3 className="text-lg font-semibold mb-2">Todo</h3>
						<p className="text-xl font-bold">{pendingTask.length}</p>
					</div>
					<div className="bg-orange-100 rounded-lg shadow-md p-4">
						<h3 className="text-lg font-semibold mb-2">InProgress</h3>
						<p className="text-xl font-bold">{doingTask.length}</p>
					</div>
					<div className="bg-green-100 rounded-lg shadow-md p-4">
						<h3 className="text-lg font-semibold mb-2">Complete</h3>
						<p className="text-xl font-bold">{completedTask.length}</p>
					</div>
				</div>
				<div className="mt-4">
					<Link to="/taskmanager" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
						Create Task
					</Link>
				</div>
			</div>
		</div>

	);
};

export default Dashboard;
