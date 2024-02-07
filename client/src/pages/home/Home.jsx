import image1 from '../../images/background.jpg'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;
	return (
		<div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image1})` }}>
			<div className='flex flex-col mx-auto p-44 items-center justify-center'>
				<h2 className='text-4xl font-bold'>Organize it all With Task Manager</h2>
				<p className='text-2xl font-bold'></p>

				{currentUser && currentUser.token ? (
					<div className='text-white justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm w-auto h-fit px-5 py-3 text-center me-2 mt-5 mb-2'>
						<Link to='/dashboard' className=''>
							Lets Plan
						</Link>
					</div>
				) : (
					<div className='text-white justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm w-auto h-fit px-5 py-3 text-center me-2 mt-5 mb-2'>
						<Link to='/signin' className=''>
							Lets Plan
						</Link>
					</div>

				)}
			</div>
		</div>
	);
};

export default Home;
