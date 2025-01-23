import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function LeadEdit() {
  const { id } = useParams();
  console.log(id);

  const [lead, setLead] = useState({
    disposition: "",
    notes: "",
  });

  const [isUpdating, setIsUpdating] = useState(false); // To track if we are updating

  // Dropdown values for disposition
  const dispositionOptions = [
    "No requirements",
    "Callback",
    "Busy",
    "Disconnected",
    "RNR / Voicemail",
    "Not interested",
    "Request Quote",
    "Quotation Sent",
    "Follow up",
    "Invalid Number",
    "Taken outside",
    "Requirement on hold",
    "Escalated",
    "Schedule Meeting",
    "Deal Closed",
    "Others",
  ];

  // Fetch lead data when component mounts or ID changes
  useEffect(() => {
    if (!id) return;

    const fetchLeadData = async () => {
      try {
        const response = await axios.get(
          `https://sensitivetechcrm.onrender.com/updatelog/getdispositions/${id}`
        );
        console.log(response);
        if (response.status === 200) {
          setLead(response.data);
          setIsUpdating(true); // Set updating mode if the lead data is found
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
        ? await axios.put(
            `https://sensitivetechcrm.onrender.com/updatelog/disposition/${id}`,
            lead
          )
        : await axios.post(
            `https://sensitivetechcrm.onrender.com/updatelog/disposition`,
            lead
          );

      if (response.status === 200 || response.status === 201) {
        alert("Lead data submitted successfully!");
        setLead({
          disposition: "",
          notes: "",
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
      <h2 className="text-4xl font-bold mb-10 text-center mt-20">
        {isUpdating ? "Update" : "Create"} Lead Disposition
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Disposition Section */}
        <div className="border border-blue-500 p-6 rounded-lg">
          <div className="space-y-8 pb-4">
            <div>
              <label className="block text-sm font-medium pb-4">Disposition:</label>
              <select
                name="disposition"
                value={lead.disposition}
                onChange={handleChange}
                className="border border-blue-300 p-2 w-full rounded"
              >
                <option value="">Select Disposition</option>
                {dispositionOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium pb-4">Notes:</label>
              <textarea
                name="notes"
                value={lead.notes}
                onChange={handleChange}
                className="border border-blue-300 p-2 w-full rounded h-24"
                placeholder="Enter notes here..."
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

      {/* Display Updated Lead Data */}
      {isUpdating && (
        <div className="mt-12 border border-blue-500 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Updated Lead Details:</h3>
          <div>
            <p>
              <strong>Disposition:</strong> {lead.disposition || "Not selected"}
            </p>
            <p className="mt-2">
              <strong>Notes:</strong> {lead.notes || "No notes added"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeadEdit;
