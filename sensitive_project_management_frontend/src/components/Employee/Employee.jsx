import React, { useState } from "react";

function Employee() {
    const [employee, setEmployee] = useState({
        fullName: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        joiningDate: "",
        salary: "",
        address: "",
        emergencyContactName: "",
        status: "Active",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(employee);
        // Add backend integration here
    };

    return (
        <div className="container mx-auto p-6 mt-12">
            <h2 className="text-4xl font-bold mb-20 text-center mt-20">Employee Form</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
                {/* First Column */}
                <div className="border-2 border-blue-500 p-6 rounded-lg">
                    <div className="space-y-8 pb-4">
                        <div>
                            <label className="block text-sm font-medium pb-4">Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={employee.fullName}
                                onChange={handleChange}
                                required
                                className="border-2 border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium pb-4">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                                required
                                className="border-2 border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium pb-4">Phone Number:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={employee.phone}
                                onChange={handleChange}
                                required
                                className="border-2 border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* Second Column */}
                <div className="border-2 border-blue-500 p-6 rounded-lg">
                    <div className="space-y-8 pb-4">
                        <div>
                            <label className="block text-sm font-medium pb-4">Department:</label>
                            <select
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                                required
                                className="border-2 border-blue-300 p-2 w-full rounded"
                            >
                                <option value="">Select Department</option>
                                <option value="HR">HR</option>
                                <option value="IT">IT</option>
                                <option value="Sales">Sales</option>
                                <option value="Finance">Finance</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium pb-4 ">Position:</label>
                            <input
                                type="text"
                                name="position"
                                value={employee.position}
                                onChange={handleChange}
                                required
                                className="border-2 border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium pb-4">Joining Date:</label>
                            <input
                                type="date"
                                name="joiningDate"
                                value={employee.joiningDate}
                                onChange={handleChange}
                                required
                                className="border-2 border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* Third Column */}
                <div className="border-2 border-blue-500 p-6 rounded-lg ">
                    <div className="space-y-8 pb-4">
                        <div>
                            <label className="block text-sm font-medium pb-4">Salary:</label>
                            <input
                                type="number"
                                name="salary"
                                value={employee.salary}
                                onChange={handleChange}
                                required
                                className="border-2 border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium pb-4">Status:</label>
                            <select
                                name="status"
                                value={employee.status}
                                onChange={handleChange}
                                className="border-2 border-blue-300 p-2 w-full rounded"
                            >
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Resigned">Resigned</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium pb-4">Emergency Contact:</label>
                            <input
                                type="text"
                                name="emergencyContactName"
                                value={employee.emergencyContactName}
                                onChange={handleChange}
                                className="border-2 border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-3 flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-[#2563eb] text-white border-2 border-black px-8 py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Employee;
