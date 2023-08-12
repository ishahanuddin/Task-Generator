import React, { useState } from 'react';
import Navbar from '../Navbar';

const ErrorMessage = () => {

  return (
    <div className='relative h-screen'>
                <Navbar/>
                <div className="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span className="font-medium">Error alert!</span> Something went wrong, please try again later.
                </div>
    </div>
  );
};

export default ErrorMessage;
