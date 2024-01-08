import Sidebar from "../../components/sidebar/Sidebar"
import ListTaskByUser from "../../components/taskmanager/ListTaskByUser"

const FilterByUser = () => {
  return (
    <div className="container mx-auto p-4 flex">
			<div className="w-1/4 bg-gray-50">
				<Sidebar />
			</div>
			<div className="w-3/4 p-4">
				<div className="grid grid-cols-1 gap-4">
					<div className="bg-white rounded-lg mb-5">
						<ListTaskByUser />
					</div>
					
				</div>
				
			</div>
		</div>
  )
}

export default FilterByUser;