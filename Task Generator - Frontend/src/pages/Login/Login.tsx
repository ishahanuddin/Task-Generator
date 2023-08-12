import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';

interface UserDetails {
    username: string;
    password: string;
}

function Login() {
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);

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
    const notify2 = (msg: string) => toast(msg,
        {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            type: "error"
        }
    );

    const usernameChangeHandler = (e: any) => {
        e.preventDefault();
        setUsername(e.target.value);
    }
    
    const passwordChangeHandler = (e: any) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    
    const loginUser = () => {
        setLoading(true);

        const body = { email: username, password: password };

        const headers = {};
        
        axios.post('https://localhost:44348/login', body, { headers })
            .then(response => {
                localStorage.setItem('token', response?.data?.jwt);
                navigate('/');
                setLoading(false);
            })
            .catch(error => {
                notify2(error.response.data.ErrorMessage);
                setLoading(false);
            });
    }
    const sendEmail = () => {
        notify("An email has been sent to your account.")
    }
    
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src={logo} alt="JWT" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                <input onChange={usernameChangeHandler} id="email" name="username" autoComplete='email' type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                    <a href="#" onClick={sendEmail} className="font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
                </div>
                </div>
                <div className="mt-2">
                <input onChange={passwordChangeHandler} id="password" name="password" autoComplete='password' type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div>
                {
                    !isLoading ? 
                    (<button onClick={loginUser} type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                        Sign in
                    </button>) :
                    (<div className="flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm">
                        loading...
                    </div>)
                }
            </div>
            <div>
                <Link to="/register">
                    <p><u>Do not have an account? Create an account now.</u></p>
                </Link>
            </div>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login