import React, { useState } from "react";

function Client() {
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
    createdDateTime: new Date().toLocaleString(), // Default to current date-time
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(client);
    // Add backend integration here
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
            <div>
              <label className="block text-sm font-medium pb-4">Created Date-Time:</label>
              <input
                type="text"
                name="createdDateTime"
                value={client.createdDateTime}
                readOnly
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
                value={client.officeLocation.addressLine}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 mb-2 w-full rounded"
                placeholder="Address Line"
              />
              <input
                type="text"
                name="officeLocation.area"
                value={client.officeLocation.area}
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
                className="border border-blue-300 p-2  w-full rounded"
                placeholder="Landmark"
              />
            </div>

            <div>
              <label className="block text-sm font-medium pb-4">Status:</label>
              <select
                name="status"
                value={client.status}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="bg-[#2563eb] text-white border border-black px-8 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Client;
