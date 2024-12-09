import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const ClientTable = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      organization: "Alpha Tech",
      contactPerson: "John Doe",
      contactNumber: "+1 9876543210",
      alternateContact: "+1 1234567890",
      emailId: "contact@alphatech.com",
      alternateMailId: "info@alphatech.com",
      businessCategory: "Technology",
      officeLocation: {
        addressLine: "123 Business Lane",
        area: "Tech Park",
        city: "San Francisco",
        state: "CA",
        pincode: "94107",
        landmark: "Near City Center",
      },
      registeredAddress: {
        addressLine: "456 Corporate Rd",
        area: "Downtown",
        city: "San Francisco",
        state: "CA",
        pincode: "94108",
        landmark: "Next to Mall",
      },
      status: "Active",
      createdDateTime: new Date().toLocaleString(),
    },
    {
      id: 2,
      organization: "Beta Corp",
      contactPerson: "Jane Smith",
      contactNumber: "+1 8765432109",
      alternateContact: "+1 2345678901",
      emailId: "support@betacorp.com",
      alternateMailId: "help@betacorp.com",
      businessCategory: "Finance",
      officeLocation: {
        addressLine: "456 Commerce St",
        area: "Business District",
        city: "New York",
        state: "NY",
        pincode: "10001",
        landmark: "Near Central Park",
      },
      registeredAddress: {
        addressLine: "789 Corporate Blvd",
        area: "Uptown",
        city: "New York",
        state: "NY",
        pincode: "10002",
        landmark: "Opposite Grand Plaza",
      },
      status: "Inactive",
      createdDateTime: new Date().toLocaleString(),
    },
    {
      id: 3,
      organization: "Gamma Innovations",
      contactPerson: "Alice Johnson",
      contactNumber: "+1 7654321098",
      alternateContact: "+1 3456789012",
      emailId: "info@gammainnovations.com",
      alternateMailId: "contact@gammainnovations.com",
      businessCategory: "Software",
      officeLocation: {
        addressLine: "789 Startup Blvd",
        area: "Tech Hub",
        city: "Austin",
        state: "TX",
        pincode: "73301",
        landmark: "Near Innovation Park",
      },
      registeredAddress: {
        addressLine: "123 Developer St",
        area: "Silicon Valley",
        city: "Austin",
        state: "TX",
        pincode: "73302",
        landmark: "Next to Tech Center",
      },
      status: "Active",
      createdDateTime: new Date().toLocaleString(),
    },
  ]);

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
              <tr key={client.id} className="border-b hover:bg-gray-50 transition-colors">
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
                <td className="p-6">{client.createdDateTime}</td>
                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors"
                      title="View Details"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors"
                      title="Edit Client"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                      title="Delete Client"
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
