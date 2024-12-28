/**
 * Filters tasks based on the active tab
 * @param {Array} tasks - Array of task objects
 * @param {string} activeTab - Current active tab ('all', 'pending', 'in-progress', 'completed')
 * @returns {Array} Filtered tasks array
 */
export const filterTasksByTab = (tasks, activeTab) => {
  if (activeTab === 'all') return tasks;
  return tasks.filter(task => task.status === activeTab);
};