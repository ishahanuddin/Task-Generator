import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ErrorMessage from '../../components/Error';
import { ToastContainer, toast } from 'react-toastify';

interface Task {
    id: number;
    name: string;
    selected: boolean;
}

function BulkDelete() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [isTasksLoading, setTasksLoading] = useState(true);
    const [isError, setError] = useState(false);

    // selected tasks
    const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

    const navigate = useNavigate();

    const notify = (msg: string) => toast(msg,
        {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            type: "success"
        }
    );

    const selectTask = (task: Task) => {
        const tasksTemp = tasks.map((taskItem) => {
            if (taskItem.id == task.id) {
                taskItem.selected = !taskItem.selected;
                const indexFound = selectedTasks.findIndex((selectedIndex) => (selectedIndex == task.id));
                if (taskItem.selected) {
                    if (indexFound == -1) setSelectedTasks([...selectedTasks, task.id]);
                }
                else {
                    if (indexFound != -1) setSelectedTasks([...selectedTasks.filter((taskIndex) => (taskIndex != task.id))]);
                }
            }
            return taskItem;
        });
        setTasks(tasksTemp);
    }

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
    
    const bulkDeleteHandler =() => {
        setLoading(true);

        const jwtToken = localStorage.getItem('token');
        
        const headers = {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        };

        const body = {
            ids: selectedTasks
        };

        axios.post('https://localhost:44348/delete-tasks', body, { headers })
            .then(response => {
                notify("Tasks deleted successfully. You will be redirected to task list screen.")
                setTimeout(() => {
                    navigate('/list-tasks');
                }, 3000);
            })
            .catch(error => {
                // navigate("/login");
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
                                Delete Tasks
                            </div>
                            <div>
                                {
                                    selectedTasks.length > 0 ? (
                                        <button onClick={bulkDeleteHandler} type="button" className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                                            Delete Selected ({selectedTasks.length})
                                        </button> ) :
                                        (""
                                    )
                                }
                            </div>
                        </div>
                        <div className="p-4 w-6/12 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                            <span className="font-medium">Info alert!</span> Please select tasks that you want to delete.
                        </div>
                        {tasks?.length > 0 && !isTasksLoading ? (<div>
                            <ul className="divide-y overflow-hidden bg-white ring-gray-900/5 sm:rounded-xl">
                                {
                                    tasks?.map((task, index) => {
                                        return (
                                            <li onClick={() => selectTask(task)} key={index} className={task.selected ? "mb-3 block max-w-sm p-6 bg-red-500 border border-gray-200 rounded-lg shadow hover:bg-red-600 dark:bg-red-700 dark:border-gray-700 dark:hover:bg-yellow-700" : "mb-3 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"}>
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.name}</h5>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>):<p>No tasks found</p>}
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default BulkDelete