import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import '../styles/Dashboard.css';

function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    setTasks(storedTasks ? JSON.parse(storedTasks) : []);
  }, []);

  const handleCreateTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <div className="dashboard-content">
        <TaskForm onSubmit={handleCreateTask} />
        
        <div className="tasks-section">
          <h2>All Tasks</h2>
          <div className="task-grid">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                isAdmin={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;