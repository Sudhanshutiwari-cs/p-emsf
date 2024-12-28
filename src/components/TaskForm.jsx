import { useState } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ onSubmit }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...task,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    setTask({ title: '', description: '', assignedTo: '', priority: 'medium' });
  };

  return (
    <div className="task-form-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={task.title}
            style={{ color: 'black' }}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
            placeholder="Enter task title"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={task.description}
            style={{ color: 'black' }}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
            placeholder="Enter task description"
          />
        </div>

        <div className="form-group">
          <label>Assign To</label>
          <input
            type="text"
            value={task.assignedTo}
            style={{ color: 'black' }}
            onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
            required
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            value={task.priority}
            style={{ color: 'black' }}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;