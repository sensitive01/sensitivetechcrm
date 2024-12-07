// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Sample initial tasks data
// const initialTasks = [
//   {
//     id: 1,
//     title: 'Website Redesign',
//     description: 'Update company website with new branding',
//     assignedTo: 'John Doe',
//     status: 'In Progress',
//     priority: 'High',
//     dueDate: '2024-01-15'
//   },
//   {
//     id: 2,
//     title: 'Marketing Report',
//     description: 'Prepare quarterly marketing performance report',
//     assignedTo: 'Jane Smith',
//     status: 'Pending',
//     priority: 'Medium',
//     dueDate: '2024-01-20'
//   }
// ];

// export const TaskList = () => {
//   const [tasks, setTasks] = useState(initialTasks);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     assignedTo: '',
//     status: 'Pending',
//     priority: 'Medium',
//     dueDate: ''
//   });

//   const navigate = useNavigate();

//   // Open the modal
//   const openModal = () => setIsModalOpen(true);

//   // Close the modal
//   const closeModal = () => setIsModalOpen(false);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   // Handle form submission to add a new task
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const taskId = tasks.length + 1; // Simple way to generate a unique ID
//     setTasks((prevState) => [
//       ...prevState,
//       { ...newTask, id: taskId }
//     ]);
//     closeModal(); // Close modal after submission
//     setNewTask({
//       title: '',
//       description: '',
//       assignedTo: '',
//       status: 'Pending',
//       priority: 'Medium',
//       dueDate: ''
//     }); // Reset form fields
//   };

//   // Handle task click for task details
//   const handleTaskClick = (taskId) => {
//     navigate(`/task/${taskId}`);
//   };

//   // Handle task deletion
//   const handleDeleteTask = (taskId) => {
//     const isConfirmed = window.confirm('Are you sure you want to delete this task?');
//     if (isConfirmed) {
//       setTasks(tasks.filter(task => task.id !== taskId));
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center">Task Management</h1>
//       <div className="flex justify-between mb-6">
//         <button
//           onClick={openModal}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//         >
//           Add Task
//         </button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tasks.map((task) => (
//           <div
//             key={task.id}
//             className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
//             onClick={() => handleTaskClick(task.id)}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">{task.title}</h2>
//               <span
//                 className={`px-3 py-1 rounded text-sm ${
//                   task.status === 'Pending'
//                     ? 'bg-yellow-100 text-yellow-800'
//                     : task.status === 'In Progress'
//                     ? 'bg-blue-100 text-blue-800'
//                     : 'bg-green-100 text-green-800'
//                 }`}
//               >
//                 {task.status}
//               </span>
//             </div>
//             <p className="text-gray-600 mb-4">{task.description}</p>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-500">
//                 Assigned to: <span className="text-blue-600">{task.assignedTo}</span>
//               </span>
//               <span
//                 className={`px-3 py-1 rounded text-sm ${
//                   task.priority === 'High'
//                     ? 'bg-red-100 text-red-800'
//                     : task.priority === 'Medium'
//                     ? 'bg-yellow-100 text-yellow-800'
//                     : 'bg-green-100 text-green-800'
//                 }`}
//               >
//                 {task.priority} Priority
//               </span>
//             </div>
//             {/* Delete Button */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent triggering task click
//                 handleDeleteTask(task.id);
//               }}
//               className="mt-4 text-red-500 hover:text-red-700 transition"
//             >
//               Delete Task
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Modal for adding task */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={newTask.title}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={newTask.description}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Assigned To</label>
//                 <input
//                   type="text"
//                   name="assignedTo"
//                   value={newTask.assignedTo}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Status</label>
//                 <select
//                   name="status"
//                   value={newTask.status}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full rounded"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Priority</label>
//                 <select
//                   name="priority"
//                   value={newTask.priority}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full rounded"
//                 >
//                   <option value="Low">Low</option>
//                   <option value="Medium">Medium</option>
//                   <option value="High">High</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Due Date</label>
//                 <input
//                   type="date"
//                   name="dueDate"
//                   value={newTask.dueDate}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full rounded"
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                   Add Task
//                 </button>
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



// // Task Detail Component
// export const TaskDetail = () => {
//   const navigate = useNavigate();
//   // In a real app, you'd fetch the specific task based on the URL parameter
//   const task = initialTasks[0]; // Example of using first task

//   return (
//     <div className="container mx-auto p-6">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">{task.title}</h1>
//           <button 
//             onClick={() => navigate('/task')}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//           >
//             Back to Tasks
//           </button>
//         </div>
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <h2 className="font-semibold">Description</h2>
//             <p className="text-gray-600">{task.description}</p>
//           </div>
//           <div>
//             <h2 className="font-semibold">Task Details</h2>
//             <p>Assigned To: {task.assignedTo}</p>
//             <p>Status: {task.status}</p>
//             <p>Priority: {task.priority}</p>
//             <p>Due Date: {task.dueDate}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskList;

// "Rakesh", "Ajith", "Abhi", "Jeyaram", "Aswini"

// import React, { useState } from "react";

// Dummy employee list
import React, { useState } from "react";

// Dummy employee list
const employeeList = ["John", "Jane", "Doe", "Alice", "Bob"];

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  // Function to handle task creation
  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        name: taskName,
        description: taskDescription,
        assignedTo: assignedTo,
        id: Date.now(),
      },
    ]);
    setTaskName("");
    setAssignedTo("");
    setTaskDescription("");
    setShowModal(false); // Close the modal after adding the task
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Handle clicking on a task card
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Task Management</h1>

      {/* Add Task Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all mb-6"
      >
        Add Task
      </button>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-200 p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer relative"
            onClick={() => handleTaskClick(task)} // Handle click on task
          >
            <h3 className="text-xl font-semibold text-gray-800">{task.name}</h3>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <p className="text-sm text-gray-500 mt-4">Assigned to: {task.assignedTo}</p>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the task card click event from firing
                handleDeleteTask(task.id);
              }}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Add Task */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Task</h2>

            {/* Task Name */}
            <div className="mb-4">
              <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
                Task Name
              </label>
              <input
                id="taskName"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task name"
              />
            </div>

            {/* Task Description */}
            <div className="mb-4">
              <label
                htmlFor="taskDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Task Description
              </label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description"
                rows="4"
              />
            </div>

            {/* Assign Employee */}
            <div className="mb-4">
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                Assign To
              </label>
              <select
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Employee</option>
                {employeeList.map((employee, index) => (
                  <option key={index} value={employee}>
                    {employee}
                  </option>
                ))}
              </select>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task Details</h2>
            <p className="text-lg font-semibold text-gray-900">Task Name: {selectedTask.name}</p>
            <p className="text-gray-600 mt-2">Description: {selectedTask.description}</p>
            <p className="text-gray-500 mt-4">Assigned to: {selectedTask.assignedTo}</p>

            {/* Close Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedTask(null)} // Close the task details modal
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
