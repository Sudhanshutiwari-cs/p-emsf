import { useState } from 'react';
import '../styles/TaskCard.css';

function TaskCard({ task, onStatusUpdate, isAdmin }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ff4444',
      medium: '#ffbb33',
      low: '#00C851'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="task-title-section">
          <h3>{task.title}</h3>
          <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
        </div>
        <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
      </div>
      
      <div className={`task-details ${isExpanded ? 'expanded' : ''}`}>
        <p className="task-description">{task.description}</p>
        <div className="task-meta">
          <p>Assigned to: {task.assignedTo}</p>
          <p>Status: <span className={`status-badge ${task.status}`}>{task.status}</span></p>
          <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
        
        {!isAdmin && (
          <div className="task-actions">
            {task.status === 'pending' && (
              <button 
                className="action-button start"
                onClick={() => onStatusUpdate(task.id, 'in-progress')}
              >
                Start Task
              </button>
            )}
            {task.status === 'in-progress' && (
              <button 
                className="action-button complete"
                onClick={() => onStatusUpdate(task.id, 'completed')}
              >
                Mark Complete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCard;