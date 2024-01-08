import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjects } from '../../redux/taskSlice';


const Dashboard = () => {
	const Projects = useSelector((state) => state.task.Projects);

	const [statusCounts, setStatusCounts] = useState({
		backlog: 0,
		todo: 0,
		doing: 0,
		done: 0,
	});

	console.log('alltasks', Projects);
	const dispatch = useDispatch();

	const countStatuses = (Projects) => {
		const counts = {
			backlog: 0,
			todo: 0,
			doing: 0,
			done: 0,
		};
		if (Array.isArray(Projects)) {
			Projects?.forEach((project) => {
				project.tasks.forEach((task) => {
					counts[task.status]++;
				});
			});
		}
		setStatusCounts(counts);
	};

	useEffect(() => {
		dispatch(getProjects())
			.catch((error) => {
				console.error('Failed to fetch projects:', error);
			});
	}, [dispatch]);

	useEffect(() => {
		countStatuses(Projects);
	}, [Projects]);

	return (
		<div className="container mx-auto p-4 flex">
			<div className="w-1/4 bg-gray-50 border-gray-400">
				<Sidebar />
			</div>
			<div className="w-3/4 p-4">
				<h2 className="text-2xl font-bold mb-6">SmartDings Dashboard</h2>

				{Array.isArray(Projects) && Projects.length > 0 ? (
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-blue-100 rounded-lg shadow-md p-4">
							<h3 className="text-lg font-semibold mb-2">Backlog</h3>
							<p className="text-xl font-bold">{statusCounts.backlog}</p>
						</div>
						<div className="bg-pink-100 rounded-lg shadow-md p-4">
							<h3 className="text-lg font-semibold mb-2">Todo</h3>
							<p className="text-xl font-bold">{statusCounts.todo}</p>
						</div>
						<div className="bg-orange-100 rounded-lg shadow-md p-4">
							<h3 className="text-lg font-semibold mb-2">InProgress</h3>
							<p className="text-xl font-bold">{statusCounts.doing}</p>
						</div>
						<div className="bg-green-100 rounded-lg shadow-md p-4">
							<h3 className="text-lg font-semibold mb-2">Complete</h3>
							<p className="text-xl font-bold">{statusCounts.done}</p>
						</div>
					</div>
				) : (
					<p>Loading projects...</p>
				)}

				<div className="mt-4">
					<Link to="/taskmanager" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
						Create Project or Task
					</Link>
				</div>
			</div>
		</div>

	);
};

export default Dashboard;
