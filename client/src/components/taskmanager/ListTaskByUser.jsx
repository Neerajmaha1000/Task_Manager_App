import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks, getProjects } from '../../redux/taskSlice';
import ListCard from './ListCard';

const ListTaskByUser = () => {
    const auth = useSelector((state) => state.auth);
    const Projects = useSelector((state) => state.task.Projects);
    const [assignedToFilter, setAssignedToFilter] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [userList, setUserList] = useState([]);


    const { currentUser } = auth;

    const dispatch = useDispatch();
    console.log('project', Projects)

    useEffect(() => {
        dispatch(getProjects())
            .catch((error) => {
                console.error('Failed to fetch projects:', error);
            });

    }, [dispatch]);


    useEffect(() => {
        if (Array.isArray(Projects)) {
            const assignedToArray = [...new Set(Projects.flatMap(project => project.tasks.map(task => task.assignedTo)))];
            setUserList(assignedToArray);
        }

        if (Array.isArray(Projects)) {
            setFilteredTasks(Projects.flatMap((project) =>
                project.tasks.filter((task) => task.assignedTo === assignedToFilter)
            ));
        }
    }, [Projects, assignedToFilter]);

    const [state, setState] = useState('');

    const handleChange2 = (e) => {
        console.log('after selection', e.target.value);
        const selectedValue = e.target.value;
        setState(e.target.value);
        setAssignedToFilter(selectedValue)
    };


    const handleChildChange = () => {
        // Call API here
        dispatch(getAllTasks(currentUser.token, currentUser.id, state));
    };



    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            {Array.isArray(Projects) && Projects.length > 0 ? (
                <select onChange={handleChange2} name='assignedTo' value={state.projName} className="px-3 py-2 border rounded focus:outline-none focus:border-blue-500">
                    {userList.map((usr) => {
                        return (<><option key={usr} value={usr}>{usr}</option></>)
                    })}
                </select>
            ) : (
                <p>Loading projects...</p>
            )}
            <table className="w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Task Name</th>
                        <th className="py-3 px-6 text-left">Assinged to</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        {/* <th className="py-3 px-6 text-center">Action</th> */}
                    </tr>
                </thead>
                {filteredTasks ? (
                    < tbody >
                        {
                            filteredTasks.map((item, index) => (
                                <ListCard key={item._id} projId={state} index={index} item={item} onValueChange={handleChildChange} />
                            ))
                        }
                    </tbody>
                ) : (
                    <p>Loading projects...</p>
                )}
            </table>
        </div >
    )
}

export default ListTaskByUser