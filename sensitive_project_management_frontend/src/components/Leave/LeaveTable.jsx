import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Fetch data from API
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('http://localhost:3000/leaves/get-all');
        console.log(response);
        setLeaves(response.data);
      } catch (err) {
        setError("Failed to load client data");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []); // Empty dependency array ensures the fetch happens only once when the component mounts


  //delete leave
  const handleDelete = async (leaveId) => {
    if (window.confirm('Are you sure you want to delete this leave?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/leaves/delete/${leaveId}`);
        if (response.status === 200) {
          // Successfully deleted, update the state
          setClients(leaves.filter((leave) => leave._id !== leaveId)); // Ensure you're using _id
        }
      } catch (err) {
        setError('Failed to delete leave');
      }
    }
  };




  // Edit leave function (redirect to the leave edit form)
  const handleEdit = (leaveId) => {
    console.log('Edit leave with ID:', leaveId);
    navigate(`/leave-edit/${leaveId}`); // Adjust navigation route
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-20 text-center mt-24">leave Leave Details</h2>

      {/* Button Section */}
      <div className="flex justify-end mb-4">
        <Link
          to="/leave" // Link to the leave Form page
          className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600 mb-6"
        >
          <FaPlus className="mr-2" />
          Add Leave
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead className="bg-blue-50 border-b">
            <tr>
              <th className="p-6 text-left">S.No</th>
              <th className="p-6 text-left whitespace-nowrap">leave ID</th>
              <th className="p-6 text-left">Name</th>
              <th className="p-6 text-left whitespace-nowrap">Running Projects</th>
              <th className="p-6 text-left whitespace-nowrap">Leave Dates</th>
              <th className="p-6 text-left">Notes</th>
              <th className="p-6 text-left">Attachment</th>
              <th className="p-6 text-left">Status</th>
              <th className="p-6 text-left whitespace-nowrap">Approved By</th>
              <th className="p-6 text-left whitespace-nowrap">Status Change Date</th>
              <th className="p-6 text-left whitespace-nowrap">Leave Applied On</th>
              <th className="p-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr key={leave.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3">{index + 1}</td>
                <td className="p-6">{leave.leaveId}</td>
                <td className="p-6 whitespace-nowrap">{leave.name}</td>
                <td className="p-6 whitespace-nowrap">{leave.runningProjects}</td>
                <td className="p-6 whitespace-nowrap">{leave.leaveDates}</td>
                <td className="p-6 whitespace-nowrap">{leave.notes}</td>
                <td className="p-6 whitespace-nowrap">{leave.attachment}</td>
                <td className="p-6">{leave.status}</td>
                <td className="p-6">{leave.approvedBy}</td>
                <td className="p-6">{leave.statusChangeDate}</td>
                <td className="p-6">{leave.leaveAppliedOn}</td>
                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors"
                      title="Edit leave"
                      onClick={() => handleEdit(leave._id)}
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                      title="Delete leave"
                      onClick={() => handleDelete(leave._id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;
