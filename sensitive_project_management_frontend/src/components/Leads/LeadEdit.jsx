import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function LeadEdit() {
  const { id } = useParams();
  console.log(id);

  const [lead, setLead] = useState({
    name: "",
    contact: "",
    email: "",
    requirements: "",
    company: "",
    location: "",
    links: "",
    comments: "",
    status: "",
  });

  // Fetch lead data when component mounts or ID changes
  useEffect(() => {
    if (!id) return;

    const fetchLeadData = async () => {
      try {
        const response = await axios.get(`https://sensitivetechcrm.onrender.com/leads/getlead/${id}`);
        console.log(response);
        if (response.status === 200) {
          setLead(response.data);
        } else {
          console.error("Failed to fetch lead details:", response.status);
        }
      } catch (error) {
        console.error("Error fetching lead details:", error);
      }
    };

    fetchLeadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = id
        ? await axios.put(`https://sensitivetechcrm.onrender.com/leads/update/${id}`, lead)
        : await axios.post(`https://sensitivetechcrm.onrender.com/leads/create`, lead);

      if (response.status === 200 || response.status === 201) {
        alert("Lead data submitted successfully!");
        setLead({
          name: "",
          contact: "",
          email: "",
          requirements: "",
          company: "",
          location: "",
          links: "",
          comments: "",
          status: "",
        });
      } else {
        alert(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting lead data:", error);
      alert(`Submission failed: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-12">
      <h2 className="text-4xl font-bold mb-10 text-center mt-20">Edit Lead Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* First Column */}
        <div className="border border-blue-500 p-6 rounded-lg">
          <div className="space-y-8 pb-4">
            <div>
              <label className="block text-sm font-medium pb-4">Name:</label>
              <input
                type="text"
                name="name"
                value={lead.name}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Contact:</label>
              <input
                type="tel"
                name="contact"
                value={lead.contact}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Email:</label>
              <input
                type="email"
                name="email"
                value={lead.email}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Company:</label>
              <input
                type="text"
                name="company"
                value={lead.company}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Location:</label>
              <input
                type="text"
                name="location"
                value={lead.location}
                onChange={handleChange}
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="border border-blue-500 p-6 rounded-lg">
          <div className="space-y-8 pb-4">
            <div>
              <label className="block text-sm font-medium pb-4">Requirements:</label>
              <textarea
                name="requirements"
                value={lead.requirements}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Links:</label>
              <input
                type="text"
                name="links"
                value={lead.links}
                onChange={handleChange}
                className="border border-blue-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Comments:</label>
              <textarea
                name="comments"
                value={lead.comments}
                onChange={handleChange}
                className="border border-blue-300 p-2 w-full rounded h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium pb-4">Status:</label>
              <select
                name="status"
                value={lead.status}
                onChange={handleChange}
                required
                className="border border-blue-300 p-2 w-full rounded"
              >
                <option value="">Select Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="qualified">Qualified</option>
                <option value="unqualified">Unqualified</option>
                <option value="converted">Converted</option>
              </select>
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

export default LeadEdit;
