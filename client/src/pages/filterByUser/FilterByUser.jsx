import Sidebar from "../../components/sidebar/Sidebar"

const FilterByUser = () => {
  return (
    <div className="container mx-auto p-4 flex">
			<div className="w-1/4 bg-gray-50">
				<Sidebar />
			</div>
			<div className="w-3/4 p-4">
				<div className="grid grid-cols-1 gap-4">
					<div className="bg-white rounded-lg mb-5">
						Working on  Filter by Users
					</div>
					{/* <div className="bg-white rounded-lg mb-5">
						<AddTask />
					</div> */}
				</div>
				{/* <div className="bg-white rounded-lg mb-5 col-span-1">
					<TaskList />
				</div> */}
			</div>
		</div>
  )
}

export default FilterByUser