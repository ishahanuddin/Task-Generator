import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import TaskList from './pages/Tasks/TaskList';
import BulkDelete from './pages/Tasks/BulkDelete';
import CreateTask from './pages/Tasks/CreateTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/list-tasks' element={<TaskList />} />
        <Route path='/bulk-delete' element={<BulkDelete />} />
        <Route path='/create-task' element={<CreateTask />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App