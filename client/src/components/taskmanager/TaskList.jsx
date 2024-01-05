import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../redux/taskSlice';
import ListCard from './ListCard';

const TaskList = () => {
	const auth = useSelector((state) => state.auth);
	const tasks = useSelector((state) => state.task);

	const { currentUser } = auth;
	const { AllTasks } = tasks;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTasks(currentUser.token, currentUser.id));
	}, [dispatch, currentUser.token, currentUser.id]);

	return (
		<div className="bg-white rounded-lg shadow-md p-4">
			<table className="w-full divide-y divide-gray-200">
				<thead>
					<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
						<th className="py-3 px-6 text-left">ID</th>
						<th className="py-3 px-6 text-left">Issue Name</th>
						<th className="py-3 px-6 text-left">Status</th>
						<th className="py-3 px-6 text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{Object.values(AllTasks).map((item) => (
						<ListCard key={item._id} item={item} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TaskList;
