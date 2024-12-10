import React, { useState, useEffect } from 'react';
import {Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch clients data from the API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clients/get-all');
        console.log(response);
        setClients(response.data);
      } catch (err) {
        setError('Failed to load client data');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []); // Empty dependency array ensures the request runs once on component mount

  // Delete client function
  const handleDelete = async (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/clients/delete/${clientId}`);
        if (response.status === 200) {
          // Successfully deleted, update the state
          setClients(clients.filter((client) => client._id !== clientId)); // Ensure you're using _id
        }
      } catch (err) {
        setError('Failed to delete client');
      }
    }
  };


  

  // Edit client function (redirect to the client edit form)
  const handleEdit = (clientId) => {
    console.log('Edit client with ID:', clientId);
    navigate(`/client-edit/${clientId}`); // Adjust navigation route
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-20 text-center mt-24">Client Details</h2>

      {/* Button Section */}
      <div className="flex justify-end mb-4">
        <Link
          to="/client-form" // Link to the Client Form page
          className="bg-blue-500 text-white px-6 py-2 rounded flex items-center hover:bg-blue-600 mb-6"
        >
          <FaPlus className="mr-2" />
          Add Client
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead className="bg-blue-50 border-b">
            <tr>
              <th className="p-6 text-left">S.No</th>
              <th className="p-6 text-left">Organization</th>
              <th className="p-6 text-left">Contact Person</th>
              <th className="p-6 text-left">Contact Number</th>
              <th className="p-6 text-left">Alternate Contact</th>
              <th className="p-6 text-left">Email ID</th>
              <th className="p-6 text-left">Alternate Mail ID</th>
              <th className="p-6 text-left">Business Category</th>
              <th className="p-6 text-left">Office Location</th>
              <th className="p-6 text-left">Registered Address</th>
              <th className="p-6 text-left">Status</th>
              <th className="p-6 text-left">Created Date-Time</th>
              <th className="p-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3">{index + 1}</td>
                <td className="p-6 whitespace-nowrap">{client.organization}</td>
                <td className="p-6">{client.contactPerson}</td>
                <td className="p-6">{client.contactNumber}</td>
                <td className="p-6">{client.alternateContact}</td>
                <td className="p-6">{client.emailId}</td>
                <td className="p-6">{client.alternateMailId}</td>
                <td className="p-6">{client.businessCategory}</td>
                <td className="p-6 whitespace-nowrap">
                  {client.officeLocation.addressLine}, {client.officeLocation.area}, {client.officeLocation.city}, {client.officeLocation.state} - {client.officeLocation.pincode} ({client.officeLocation.landmark})
                </td>
                <td className="p-6 whitespace-nowrap">
                  {client.registeredAddress.addressLine}, {client.registeredAddress.area}, {client.registeredAddress.city}, {client.registeredAddress.state} - {client.registeredAddress.pincode} ({client.registeredAddress.landmark})
                </td>
                <td className="p-6">{client.status}</td>
                <td className="p-6">{client.createdAt}</td>
                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors"
                      title="Edit Client"
                      onClick={() => handleEdit(client._id)} // Use _id for edit
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                      title="Delete Client"
                      onClick={() => handleDelete(client._id)} // Use _id for delete
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

export default ClientTable;
