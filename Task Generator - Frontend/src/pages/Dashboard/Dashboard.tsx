import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const [item, setItem] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();
    
    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        
        const headers = {
            'Authorization': `Bearer ${jwtToken}`,
        };
        
        axios.get('https://localhost:44348/user', { headers })
            .then(response => {
                setLoading(false);
                navigate('/list-tasks');
            })
            .catch(error => {
                navigate("/login");
                setLoading(false);
            });
    }, [])

    if (isLoading) {}
    else {
        return (
            <div className="flex min-h-full flex-col space-y-4 justify-center px-6 py-12 lg:px-8">
                <div className="text-4xl">
                    Dashboard
                </div>
                <div>
                    Welcome to the homepage!
                </div>
                <div>

                </div>
                <div>
                    <button className="bg-orange-600 text-center text-gray-50 w-24 h-12 rounded-md">
                        Logout
                    </button>
                </div>
            </div>
        )
    }
}

export default Dashboard