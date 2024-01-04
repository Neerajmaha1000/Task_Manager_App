import image1 from '../../images/background.jpg'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/authSlice';

const Signin = () => {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			signin({
				email: state.email,
				password: state.password,
			})
		);
	};

	return (
		<div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image1})` }}>
			<div className='container mx-auto pt-16 flex flex-col items-center'>
				<div className='bg-white rounded-lg shadow-md p-8'>
					<h4 className="text-2xl font-bold mb-6 text-center">Sign In</h4>
					<form className='w-full' onSubmit={handleSubmit}>
						<div className='mb-4'>
							<label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
							<input
								type='email'
								name='email'
								value={state.email}
								id=''
								placeholder='Enter Email'
								onChange={handleChange}
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							/>
						</div>
						<div className='mb-6'>
							<label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
							<input
								type='password'
								name='password'
								value={state.password}
								id=''
								placeholder='Enter Password'
								onChange={handleChange}
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							/>
						</div>
						<div className=''>
							<button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Sign In</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signin;
