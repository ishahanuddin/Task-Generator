import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ErrorMessage from '../../components/Error';

interface Task {
    id: number;
    name: string;
    isDelete: boolean;
}

function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [isTasksLoading, setTasksLoading] = useState(true);
    const [isError, setError] = useState(false);

    const navigate = useNavigate();

    const getTasks = async () => {
        setTasksLoading(true);

        const jwtToken = localStorage.getItem('token');
        
        const headers = {
            'Authorization': `Bearer ${jwtToken}`,
        };

        axios.get('https://localhost:44348/list-tasks', { headers })
            .then(response => {
                setLoading(false);
                if (response.data.tasks) {
                    const tempResponse = response.data.tasks.map((value: any) => {
                        return {id: value.Id, name: value.Name, selected: false}
                });
                setTasks(tempResponse);
                }
            })
            .catch(error => {
                setError(true);
                //navigate("/login");
                setLoading(false);
            });

        setTasksLoading(false);
    }

    const getUser = () => {

        const jwtToken = localStorage.getItem('token');
        
        const headers = {
            'Authorization': `Bearer ${jwtToken}`,
        };
        
        axios.get('https://localhost:44348/user', { headers })
            .then(response => {
                setLoading(false);
            })
            .catch(error => {
                navigate("/login");
                setLoading(false);
            });
        setLoading(false);
    }
    
    useEffect(() => {
        getUser();
        getTasks();
    }, [])

    if (isLoading) {}
    else if(isError)
    {
        return (
            <ErrorMessage></ErrorMessage>
        )
    }
    else {
        return (
            <div className='relative h-screen'>
                <Navbar/>
                <div className='px-32'>
                    <div className=" flex min-h-full flex-col space-y-4 justify-center px-6 py-12 lg:px-8">
                        <div className='flex justify-between'>
                            <div className="text-4xl">
                                Tasks
                            </div>
                        </div>
                        {tasks?.length > 0 && !isTasksLoading ? (<div>
                                {
                                    tasks?.map((task, index) => {
                                        return (
                                            <a href="#" key={index} className="mb-3 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.name}</h5>
                                            </a>
                                        )
                                    })
                                }
                        </div>):<p>No tasks found</p>}
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskList