import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';

const Dashboard = () => {

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
						<p className="text-xl font-bold">2</p>
					</div>
					<div className="bg-pink-100 rounded-lg shadow-md p-4">
						<h3 className="text-lg font-semibold mb-2">Todo</h3>
						<p className="text-xl font-bold">0</p>
					</div>
					<div className="bg-orange-100 rounded-lg shadow-md p-4">
						<h3 className="text-lg font-semibold mb-2">InProgress</h3>
						<p className="text-xl font-bold">3</p>
					</div>
					<div className="bg-green-100 rounded-lg shadow-md p-4">
						<h3 className="text-lg font-semibold mb-2">Complete</h3>
						<p className="text-xl font-bold">0</p>
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
