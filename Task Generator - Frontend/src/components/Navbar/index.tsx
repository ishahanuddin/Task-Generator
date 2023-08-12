import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear()
    navigate('/login');
  };

  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <a href="#" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Task Generator</a>
      </div>
      <div>
        <a href="/list-tasks" className="text-lg no-underline text-grey-darkest hover:text-blue-500 ml-2">Task List</a>
        <a href="/create-task" className="text-lg no-underline text-grey-darkest hover:text-blue-500 ml-2">Create Task</a>
        <a href="/bulk-delete" className="text-lg no-underline text-grey-darkest hover:text-blue-500 ml-2">Delete Task</a>
        <a href="#" onClick={handleSignOut} className="text-lg no-underline text-grey-darkest hover:text-blue-500 ml-2">Logout</a>
      </div>
    </nav>
  );
};

export default Navbar;
