import React, { useState } from 'react';

const TaskManagementForm = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('No Progress');
  const [assignedTo, setAssignedTo] = useState('Pooja S.');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('None');
  const [followers, setFollowers] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleAssignedToChange = (e) => setAssignedTo(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleFollowersChange = (value) => setFollowers(value);
  const handleSubtasksChange = (value) => setSubtasks(value);
  const handleAttachmentsChange = (value) => setAttachments(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      title,
      status,
      assignedTo,
      startDate,
      dueDate,
      priority,
      followers,
      subtasks,
      attachments
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="No Progress">No Progress</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="assignedTo" className="block font-medium mb-2">
            Assigned to
          </label>
          <input
            id="assignedTo"
            type="text"
            value={assignedTo}
            onChange={handleAssignedToChange}
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block font-medium mb-2">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block font-medium mb-2">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={handleDueDateChange}
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="block font-medium mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={handlePriorityChange}
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="None">None</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="followers" className="block font-medium mb-2">
            Followers
          </label>
          <input
            id="followers"
            type="text"
            value={followers.join(', ')}
            onChange={(e) => handleFollowersChange(e.target.value.split(', '))}
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter followers (comma-separated)"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subtasks" className="block font-medium mb-2">
            Subtasks
          </label>
          <input
            id="subtasks"
            type="text"
            value={subtasks.join(', ')}
            onChange={(e) => handleSubtasksChange(e.target.value.split(', '))}
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter subtasks (comma-separated)"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="attachments" className="block font-medium mb-2">
            Attachments
          </label>
          <input
            id="attachments"
            type="text"
            value={attachments.join(', ')}
            onChange={(e) => handleAttachmentsChange(e.target.value.split(', '))}
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter attachments (comma-separated)"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Create
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 ml-4"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 ml-4"
          >
            Add Another
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskManagementForm;