import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TaskCard from './TaskCard';
import TaskStats from './TaskStats';

import { filterTasksByTab } from '../utils/taskUtils';
import '../styles/Dashboard.css';
import '../styles/Tabs.css';

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const allTasks = storedTasks ? JSON.parse(storedTasks) : sampleTasks;
    setTasks(allTasks.filter(task => task.assignedTo === user.username));
  }, [user.username]);

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || sampleTasks;
    const updatedTasks = allTasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks.filter(task => task.assignedTo === user.username));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredTasks = useMemo(() => 
    filterTasksByTab(tasks, activeTab),
    [tasks, activeTab]
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Employee Dashboard</h1>
          <p className="welcome-text">Welcome, {user.fullName || user.username}!</p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-content">
        <TaskStats tasks={tasks} />
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Tasks
          </button>
          <button 
            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`tab ${activeTab === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('in-progress')}
          >
            In Progress
          </button>
          <button 
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>

        <div className="tasks-section">
          <div className="task-grid">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusUpdate={handleUpdateTaskStatus}
                isAdmin={false}
              />
            ))}
            {filteredTasks.length === 0 && (
              <div className="no-tasks">
                <p>No tasks found in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;