import Sidebar from '../../components/sidebar/Sidebar';
import AddTask from '../../components/taskmanager/AddTask';
import TaskList from '../../components/taskmanager/TaskList';
import AddProject from '../../components/taskmanager/AddProject';
import AssignTask from '../../components/taskmanager/AssignTask';

const TaskManager = () => {
	return (

		<div className="container mx-auto p-4 flex">
			<div className="w-1/4 bg-gray-50">
				<Sidebar />
			</div>
			<div className="w-3/4 p-4">
				<div className="grid grid-cols-1">
					
					<div className="bg-white rounded-lg mb-5">
						<AddProject />
					</div>
					<div className="bg-white rounded-lg mb-5">
						<AddTask />
					</div>
					<div className="bg-white rounded-lg mb-5">
						<AssignTask />
					</div>
					<div className="bg-white rounded-lg mb-5">
						<TaskList />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskManager;