import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutSuccess } from '../../redux/authSlice';
import history from '../../history';

const Header = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(logoutSuccess());
		localStorage.removeItem('auth');
		history.push('/signin');
		window.location.reload();
	};
	return (
		<div>
			<nav className='bg-gray-800 text-white py-4 px-6 flex items-center justify-between'>
				<div className='flex items-center'>
					<h5 className='font-bold text-xl'>Task Manager</h5>
				</div>
				<div className='flex items-center'>
					{auth.currentUser && auth.currentUser.token ? (
						<Link to='/signin' className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={handleClick}>
							SignOut
						</Link>
					) : (
						<>
							<Link to='/signin' className='text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-medium mr-4'>
								SignIn
							</Link>
							<Link to='/signup' className='text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded font-medium'>
								SignUp
							</Link>
						</>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Header;
