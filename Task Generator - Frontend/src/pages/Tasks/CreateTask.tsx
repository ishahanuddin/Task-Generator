import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ErrorMessage from '../../components/Error';
import { ToastContainer, toast } from 'react-toastify';

function CreateTask() {
    const [newTask, setNewTask] = useState<string>("");
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);

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
    }, [])

    const addTask = () => {
        const body = { name: newTask };
        const jwtToken = localStorage.getItem('token');
        
        const headers = {
            'Authorization': `Bearer ${jwtToken}`,
        };
        axios.post('https://localhost:44348/create-task', body, { headers })
            .then(response => {
                notify("Task created successfully. You will be redirected to task list screen.")
                setTimeout(() => {
                    navigate('/list-tasks');
                  }, 3000);
            })
            .catch(error => {
                setError(true);
                setLoading(false);
            });
    }

    const taskNameChangeHandler = (e: any) => {
        e.preventDefault();
        setNewTask(e.target.value);
    }

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
                            Create Task
                            </div>
                        </div>
                        <div className='mt-4'>
                            <label>Name: </label>
                            <input onChange={taskNameChangeHandler} type="text" name="text" id="text" className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="Add task's name" aria-describedby="new task" />
                        </div>
                        <div className='mt-4'>
                            <button onClick={addTask} className="flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Add</button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default CreateTask