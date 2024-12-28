import { memo } from 'react';
import '../styles/TaskStats.css';

const TaskStats = memo(function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      color: '#3b82f6'
    },
    {
      label: 'Completed',
      value: completedTasks,
      color: '#10b981'
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      color: '#6366f1'
    },
    {
      label: 'Pending',
      value: pendingTasks,
      color: '#f59e0b'
    }
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="stat-card"
          style={{ '--accent-color': stat.color }}
        >
          <h3>{stat.label}</h3>
          <p className="stat-value">{stat.value}</p>
        </div>
      ))}
    </div>
  );
});

export default TaskStats;