import { BiChevronLeft, BiChevronRight, BiTrash } from 'react-icons/bi';
import { arrowClick, deleteItem } from '../../redux/taskSlice';
import { useDispatch } from 'react-redux';

const ListCard = (items) => {
	const { item, projId } = items;
	//const { projId } = projectId

	const dispatch = useDispatch();
	console.log('projId', projId);
	
	const ArrowClick = (string) => {
		dispatch(arrowClick(item, projId, string));
	};
	const handleDelete = () => {
		dispatch(deleteItem(item._id));
	};

	return (
		<tr className={`bg-white hover:bg-gray-100 ${item.status === 'done' ? 'text-green-500' : ''
			}`}>
			<td className="py-4 px-6 text-left font-medium whitespace-nowrap">
				{item._id}
			</td>
			<td className="py-4 px-6 text-left">
				{item.task}
			</td>
			<td className="py-4 px-6 text-left">
				{item.assignedTo}
			</td>
			<td className="py-4 px-6 text-left">
				{item.status}
			</td>
			<td className="py-4 px-6 text-center">
				<button
					type="button"
					disabled={item.status === 'backlog'}
					onClick={() => ArrowClick('left')}
					className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					<BiChevronLeft />
				</button>
				<button
					type="button"
					disabled={item.status === 'done'}
					onClick={() => ArrowClick('right')}
					className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					<BiChevronRight />
				</button>
				<button
					onClick={handleDelete}
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					<BiTrash />
				</button>
			</td>
		</tr>
	);
};

export default ListCard;
