import { BiChevronLeft, BiChevronRight, BiTrash } from 'react-icons/bi';

const TaskList = (items) => {
	

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
					<td className="py-3 px-6 text-left">6595534385D35A5ED8422D4F</td>
					<td className="py-3 px-6 text-left">Task Number 1</td>
					<td className="py-3 px-6 text-left">Backlog</td>
					<td className="py-3 px-6 text-center">
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
				</tbody>
			</table>
		</div>
	);
};

export default TaskList;
