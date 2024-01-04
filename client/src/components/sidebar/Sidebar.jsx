import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;

	return (
		<div className="bg-gray-50 p-4 text-gray-800">
			<ul className="space-y-4">
				<li className="flex items-center justify-start">
					<h6 className='font-thin'>Username : </h6>
					<h5 className="font-semibold">{currentUser.username}</h5>
				</li>
				<li>
					<Link to="/dashboard" className="block py-1 px-4 hover:bg-gray-400 bg-gray-200 rounded-md font-semibold">
						Dashboard
					</Link>
				</li>
				<li>
					<Link to="/dashboard" className="block py-1 px-4 hover:bg-gray-400 bg-gray-200 rounded-md font-semibold">
						Filter by Employee
					</Link>
				</li>
				<li>
					<Link to="/dashboard" className="block py-1 px-4 hover:bg-gray-400 bg-gray-200 rounded-md font-semibold">
						Filter by Project
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
