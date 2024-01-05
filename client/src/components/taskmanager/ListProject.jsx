import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../redux/taskSlice';

const ListProject = () => {

    // const auth = useSelector((state) => state.auth);
    const Projects = useSelector((state) => state.task.Projects);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects())
            .catch((error) => {
                console.error('Failed to fetch projects:', error);
            });
    }, [dispatch]);

    const [state, setState] = useState({
		task: '',
		assingedTo: '',
		projectAssinged: ''
	});
    const handleChange2 = (e) => {
        console.log('after selection', e.target.value);
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    console.log('frontProj', Projects);
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <table className="w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Project Name</th>
                        {/* <th className="py-3 px-6 text-left">IIIssue Name</th>
                        <th className="py-3 px-6 text-left">SStatus</th>
                        <th className="py-3 px-6 text-center">Action</th> */}
                    </tr>
                </thead>
                {Projects && Projects.length > 0 ? (
                    <tbody>
                        <select onChange={handleChange2} name='assignedTo' value={state.projectAssinged} className="px-3 py-2 border rounded focus:outline-none focus:border-blue-500">
                            {Projects.map((emp) => {
                                return (<><option key={emp.name} value={emp._id}>{emp.name}</option></>)
                            })}
                        </select>
                    </tbody>
                ) : (
                    <p>Loading projects...</p>
                )}
            </table>
            {/* <pre>{JSON.stringify(Projects, null, 2)}</pre> */}
        </div>
    )
}

export default ListProject