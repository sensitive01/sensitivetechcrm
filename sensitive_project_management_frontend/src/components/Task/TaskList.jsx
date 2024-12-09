import React from "react";

const TaskList = ({ tasks, onAddTask }) => {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Task Management</h2>
        <button 
          onClick={onAddTask} 
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Add Task
        </button>
      </div>
      <table border="1" cellSpacing="0" cellPadding="10" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Title</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Followers</th>
            <th>Subtasks</th>
            <th>Attachments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.assignedTo}</td>
                <td>{task.startDate}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.followers.join(", ")}</td>
                <td>{task.subtasks.length}</td>
                <td>{task.attachments.length}</td>
                <td>
                  <button onClick={() => handleEdit(task.id)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const handleEdit = (id) => {
  alert(`Edit Task ID: ${id}`);
};

const handleDelete = (id) => {
  alert(`Delete Task ID: ${id}`);
};

// Sample data
const tasks = [
  {
    id: 1,
    title: "Design UI for Dashboard",
    status: "In Progress",
    assignedTo: "John Doe",
    startDate: "2023-12-01",
    dueDate: "2023-12-10",
    priority: "High",
    followers: ["Alice", "Bob"],
    subtasks: ["Create Mockups", "Design Review"],
    attachments: ["mockup.png", "design.pdf"],
  },
  {
    id: 2,
    title: "Setup Backend API",
    status: "Completed",
    assignedTo: "Jane Smith",
    startDate: "2023-11-20",
    dueDate: "2023-11-30",
    priority: "Medium",
    followers: ["David", "Emma"],
    subtasks: ["Setup MongoDB", "Test API"],
    attachments: ["api-docs.pdf"],
  },
];

export default function App() {
  const handleAddTask = () => {
    // Redirect to Add Task Page
    alert("Redirecting to Add Task page!");
  };

  return <TaskList tasks={tasks} onAddTask={handleAddTask} />;
}
