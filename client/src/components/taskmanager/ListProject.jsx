import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../redux/taskSlice';


const ListProject = () => {

    const auth = useSelector((state) => state.auth);
    const tasks = useSelector((state) => state.task);

    const { currentUser } = auth;
    const { Projects } = tasks;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects(currentUser.token, currentUser.id));
    }, [dispatch, currentUser.token, currentUser.id]);


    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <table className="w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">IDD</th>
                        <th className="py-3 px-6 text-left">IIIssue Name</th>
                        <th className="py-3 px-6 text-left">SStatus</th>
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(Projects).map((item) => (
                        <h4 key={item}>{item}</h4>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListProject