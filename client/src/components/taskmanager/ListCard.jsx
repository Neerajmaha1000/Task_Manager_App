import { BiChevronLeft, BiChevronRight, BiTrash } from 'react-icons/bi';


const ListCard = (items) => {
	

	return (
			<tr className={`bg-white hover:bg-gray-100 ${ items === 'done' ? 'text-green-500' : ''
				}`}>
				<td className="py-4 px-6 text-left font-medium whitespace-nowrap">
					6595534385D35A5ED8422D4F
				</td>
				<td className="py-4 px-6 text-left">
					Task Number 1
				</td>
				<td className="py-4 px-6 text-left">
					Backlog
				</td>
				<td className="py-4 px-6 text-center">
					<button
						type="button"
						disabled={items === 'backlog'}
						onClick={() => ('left')}
						className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						<BiChevronLeft />
					</button>
					<button
						type="button"
						disabled={items === 'done'}
						onClick={() => ('right')}
						className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						<BiChevronRight />
					</button>
					<button
						onClick={''}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						<BiTrash />
					</button>
				</td>
			</tr>

	);
};

export default ListCard;
