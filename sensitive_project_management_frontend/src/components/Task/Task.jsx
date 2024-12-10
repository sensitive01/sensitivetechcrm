import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

// Sample tasks with additional fields
const initialTasks = [
  {
    id: '#402235',
    project: 'Automatic Payment System',
    task: 'Make an Automatic Payment System that enables the design',
    empId: 'EMP123',
    attachment: 'https://via.placeholder.com/50',
    description: 'This task involves designing the automatic payment system...',
    timeline: '2024-12-31',
    status: 'Completed',
    date: '2024-11-10',
  },
  {
    id: '#402236',
    project: 'Payment Gateway Integration',
    task: 'Build an API for Payment Gateway Integration',
    empId: 'EMP124',
    attachment: 'https://via.placeholder.com/50',
    description: 'This task includes setting up API integration with the payment gateway...',
    timeline: '2024-12-15',
    status: 'In Progress',
    date: '2024-11-15',
  },
  {
    id: '#402237',
    project: 'Mobile App Development',
    task: 'Develop the mobile app for the client’s e-commerce platform',
    empId: 'EMP125',
    attachment: 'https://via.placeholder.com/50',
    description: 'This task involves creating the frontend and backend for the mobile app...',
    timeline: '2025-01-10',
    status: 'Pending',
    date: '2024-12-01',
  },
  {
    id: '#402238',
    project: 'Website Redesign',
    task: 'Redesign the website for better user experience and performance',
    empId: 'EMP126',
    attachment: 'https://via.placeholder.com/50',
    description: 'This task involves revamping the UI/UX and improving load times...',
    timeline: '2025-02-20',
    status: 'Completed',
    date: '2024-10-10',
  },
  {
    id: '#402239',
    project: 'Data Migration',
    task: 'Migrate old data from legacy systems to new cloud storage',
    empId: 'EMP127',
    attachment: 'https://via.placeholder.com/50',
    description: 'This task requires safely migrating data to the new infrastructure...',
    timeline: '2024-12-25',
    status: 'In Progress',
    date: '2024-11-30',
  },
];

function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className="container mx-auto p-6 mt-20">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Tasks</h2>

      {/* Add Task Button */}
      <div className="flex justify-between mb-6">
        <Link
          to="/task-form"  // Link to the add-task page (you need to create this page)
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Task
        </Link>
      </div>

      {/* Task Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Task</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Project</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Employee</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Timeline</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Attachment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition duration-300">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.task}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.project}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.empId}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.timeline}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.date}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.status}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {task.attachment && (
                    <a
                      href={task.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Attachment
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
