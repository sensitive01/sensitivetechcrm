import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ClientEdit() {
  const { id } = useParams(); // Assume ID is passed in the URL as /client-edit/:id
  console.log(id)
  const [client, setClient] = useState({
    organization: "",
    contactPerson: "",
    contactNumber: "",
    alternateContact: "",
    emailId: "",
    alternateMailId: "",
    businessCategory: "",
    officeLocation: {
      addressLine: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    },
    registeredAddress: {
      addressLine: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    },
    status: "",
  });

  // Fetch user details when the component mounts or the ID changes.
  useEffect(() => {
    if (!id) return; // Skip if ID is not provided.

    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`https://sensitivetechcrm.onrender.com/clients/get/${id}`);
        console.log(response)
        if (response.status === 200) {
          setClient(response.data); // Update the state with fetched data.
        } else {
          console.error("Failed to fetch client details:", response.status);
        }
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchClientDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("officeLocation") || name.includes("registeredAddress")) {
      const [field, subfield] = name.split(".");
      setClient((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subfield]: value,
        },
      }));
    } else {
      setClient((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = id
        ? await axios.put(`https://sensitivetechcrm.onrender.com/clients/update/${id}`, client) // Update client
        : await axios.post(`https://sensitivetechcrm.onrender.com/clients/create`, client); // Create client
        

      if (response.status === 200 || response.status === 201) {
        alert("Client data submitted successfully!");
        setClient({
          organization: "",
          contactPerson: "",
          contactNumber: "",
          alternateContact: "",
          emailId: "",
          alternateMailId: "",
          businessCategory: "",
          officeLocation: {
            addressLine: "",
            area: "",
            city: "",
            state: "",
            pincode: "",
            landmark: "",
          },
          registeredAddress: {
            addressLine: "",
            area: "",
            city: "",
            state: "",
            pincode: "",
            landmark: "",
          },
          status: "",
        });
        } else {
      alert(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error submitting data:", error);
    alert(`Submission failed: ${error.message}`);
  }
  };

  return (
    <div className="container mx-auto p-6 mt-12">
      <h2 className="text-4xl font-bold mb-10 text-center mt-20">Client Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* First Column */}
        <div className="border border-blue-500 p-6 rounded-lg">
          <div className="space-y-8 pb-4">
            <div>
              <label className="block text-sm font-medium pb-4">Organization:</label>
              <input
                type="text"
                name="organization"
                value={client.organization}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Contact Person:</label>
              <input
                type="text"
                name="contactPerson"
                value={client.contactPerson}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Contact Number:</label>
              <input
                type="tel"
                name="contactNumber"
                value={client.contactNumber}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Alternate Contact:</label>
              <input
                type="tel"
                name="alternateContact"
                value={client.alternateContact}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Email ID:</label>
              <input
                type="email"
                name="emailId"
                value={client.emailId}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Alternate Email ID:</label>
              <input
                type="email"
                name="alternateMailId"
                value={client.alternateMailId}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Business Category:</label>
              <input
                type="text"
                name="businessCategory"
                value={client.businessCategory}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="border border-blue-500 p-6 rounded-lg">
          <div className="space-y-8 pb-4">
            {/* Office Location */}
            <div>
              <label className="block text-sm font-medium pb-4">Office Location:</label>
              <input
                type="text"
                name="officeLocation.addressLine"
                value={client?.officeLocation?.addressLine}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="Address Line"
              />
              <input
                type="text"
                name="officeLocation.area"
                value={client?.officeLocation?.area}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="Area"
              />
              <input
                type="text"
                name="officeLocation.city"
                value={client.officeLocation.city}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="City"
              />
              <input
                type="text"
                name="officeLocation.state"
                value={client.officeLocation.state}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="State"
              />
              <input
                type="text"
                name="officeLocation.pincode"
                value={client.officeLocation.pincode}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="Pincode"
              />
              <input
                type="text"
                name="officeLocation.landmark"
                value={client.officeLocation.landmark}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
                placeholder="Landmark"
              />
            </div>

            {/* Registered Address */}
            <div>
              <label className="block text-sm font-medium pb-4">Registered Address:</label>
              <input
                type="text"
                name="registeredAddress.addressLine"
                value={client.registeredAddress.addressLine}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="Address Line"
              />
              <input
                type="text"
                name="registeredAddress.area"
                value={client.registeredAddress.area}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="Area"
              />
              <input
                type="text"
                name="registeredAddress.city"
                value={client.registeredAddress.city}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="City"
              />
              <input
                type="text"
                name="registeredAddress.state"
                value={client.registeredAddress.state}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="State"
              />
              <input
                type="text"
                name="registeredAddress.pincode"
                value={client.registeredAddress.pincode}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="Pincode"
              />
              <input
                type="text"
                name="registeredAddress.landmark"
                value={client.registeredAddress.landmark}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
                placeholder="Landmark"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ClientEdit;