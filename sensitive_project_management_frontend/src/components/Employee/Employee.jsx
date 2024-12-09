import React, { useState } from 'react';

<<<<<<< HEAD
const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    officeEmail: '',
    alternateEmail: '',
    contactNumber: '',
    alternateContact: '',
    department: '',
    designation: '',
    idProofType: '',
    idProofNumber: '',
    idProofFile: null,
    qualification: '',
    expertise: '',
    experience: '',
    resume: null,
    doj: '',
    maritalStatus: '',
    presentAddress: {
      addressLine: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    },
    permanentAddress: {
      addressLine: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    },
    addressProofType: '',
    addressProofNumber: '',
    addressProofFile: null,
    password: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
=======
function Employee() {
    const [employee, setEmployee] = useState({
        employeeId: "",
        fullName: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        joiningDate: "",
        address: "",
        emergencyContactName: "",
        status: "Active",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`name:${name},value:${value}`)
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };
>>>>>>> 03fae27a90367ad50d44a63b0cc73f2f475c6ae0

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0]
    }));
  };

<<<<<<< HEAD
  const handleAddressChange = (e, type) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can submit the form data to an API here.
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <h2 className="text-4xl font-bold mb-8 text-center">Employee Form</h2>
      <div className="border border-gray-300 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block font-semibold">Emp ID</label>
              <input 
                type="text" 
                name="empId" 
                value={formData.empId}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
=======
    return (
        <div className="container mx-auto p-6 mt-12">
            <h2 className="text-4xl font-bold mb-20 text-center mt-20">Employee Form</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
                {/* First Column */}
                <div className="border border-blue-500 p-6 rounded-lg">
                    <div className="space-y-8 pb-4">
                        {/* Full Name and Employee ID Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium pb-4">Full Name:</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={employee.fullName}
                                    onChange={handleChange}
                                    required
                                    className="border border-blue-300 p-2 w-full rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium pb-4">Employee ID:</label>
                                <input
                                    type="text"
                                    name="employeeId"
                                    value={employee.employeeId}
                                    onChange={handleChange}
                                    required
                                    className="border border-blue-300 p-2 w-full rounded"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium pb-4">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                                required
                                className="border border-blue-300 p-2 w-full rounded"
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
                                className="border border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* Second Column */}
                <div className="border border-blue-500 p-6 rounded-lg">
                    <div className="space-y-8 pb-4">
                        <div>
                            <label className="block text-sm font-medium pb-4">Department:</label>
                            <select
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                                required
                                className="border border-blue-300 p-2 w-full rounded"
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
                                className="border border-blue-300 p-2 w-full rounded"
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
                                className="border border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* Third Column */}
                <div className="border border-blue-500 p-6 rounded-lg ">
                    <div className="space-y-8 pb-4">
                        <div>
                            <label className="block text-sm font-medium pb-4">Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={employee.address}
                                onChange={handleChange}
                                required
                                className="border border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium pb-4">Status:</label>
                            <select
                                name="status"
                                value={employee.status}
                                onChange={handleChange}
                                className="border border-blue-300 p-2 w-full rounded"
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
                                className="border border-blue-300 p-2 w-full rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-3 flex justify-center mt-6">
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
>>>>>>> 03fae27a90367ad50d44a63b0cc73f2f475c6ae0

            <div>
              <label className="block font-semibold">Gender</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="Male" 
                    checked={formData.gender === 'Male'} 
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="mr-4">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="Female" 
                    checked={formData.gender === 'Female'} 
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="gender" 
                    value="Other" 
                    checked={formData.gender === 'Other'} 
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold">DOB</label>
              <input 
                type="date" 
                name="dob" 
                value={formData.dob}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Office Email</label>
              <input 
                type="email" 
                name="officeEmail" 
                value={formData.officeEmail}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Alternate Email</label>
              <input 
                type="email" 
                name="alternateEmail" 
                value={formData.alternateEmail}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Contact Number</label>
              <input 
                type="text" 
                name="contactNumber" 
                value={formData.contactNumber}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Alternate Contact</label>
              <input 
                type="text" 
                name="alternateContact" 
                value={formData.alternateContact}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Department</label>
              <input 
                type="text" 
                name="department" 
                value={formData.department}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Designation</label>
              <input 
                type="text" 
                name="designation" 
                value={formData.designation}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">ID Proof Type</label>
              <select 
                name="idProofType" 
                value={formData.idProofType} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select ID Proof Type</option>
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
                <option value="Ration Card">Ration Card</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">ID Proof Number</label>
              <input 
                type="text" 
                name="idProofNumber" 
                value={formData.idProofNumber}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Upload ID Proof</label>
              <input 
                type="file" 
                name="idProofFile" 
                onChange={handleFileChange} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Qualification</label>
              <input 
                type="text" 
                name="qualification" 
                value={formData.qualification}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Expertise In</label>
              <input 
                type="text" 
                name="expertise" 
                value={formData.expertise}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Experience</label>
              <input 
                type="text" 
                name="experience" 
                value={formData.experience}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Upload Resume</label>
              <input 
                type="file" 
                name="resume" 
                onChange={handleFileChange} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">DOJ</label>
              <input 
                type="date" 
                name="doj" 
                value={formData.doj}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Marital Status</label>
              <select 
                name="maritalStatus" 
                value={formData.maritalStatus} 
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Present Address</label>
              <input 
                type="text" 
                name="addressLine"
                value={formData.presentAddress.addressLine}
                onChange={(e) => handleAddressChange(e, 'presentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Address Line"
              />
              <input 
                type="text" 
                name="area"
                value={formData.presentAddress.area}
                onChange={(e) => handleAddressChange(e, 'presentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Area"
              />
              <input 
                type="text" 
                name="city"
                value={formData.presentAddress.city}
                onChange={(e) => handleAddressChange(e, 'presentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="City"
              />
              <input 
                type="text" 
                name="state"
                value={formData.presentAddress.state}
                onChange={(e) => handleAddressChange(e, 'presentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="State"
              />
              <input 
                type="text" 
                name="pincode"
                value={formData.presentAddress.pincode}
                onChange={(e) => handleAddressChange(e, 'presentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Pincode"
              />
              <input 
                type="text" 
                name="landmark"
                value={formData.presentAddress.landmark}
                onChange={(e) => handleAddressChange(e, 'presentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Landmark"
              />
            </div>

            <div>
              <label className="block font-semibold">Permanent Address</label>
              <input 
                type="text" 
                name="addressLine"
                value={formData.permanentAddress.addressLine}
                onChange={(e) => handleAddressChange(e, 'permanentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Address Line"
              />
              <input 
                type="text" 
                name="area"
                value={formData.permanentAddress.area}
                onChange={(e) => handleAddressChange(e, 'permanentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Area"
              />
              <input 
                type="text" 
                name="city"
                value={formData.permanentAddress.city}
                onChange={(e) => handleAddressChange(e, 'permanentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="City"
              />
              <input 
                type="text" 
                name="state"
                value={formData.permanentAddress.state}
                onChange={(e) => handleAddressChange(e, 'permanentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="State"
              />
              <input 
                type="text" 
                name="pincode"
                value={formData.permanentAddress.pincode}
                onChange={(e) => handleAddressChange(e, 'permanentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Pincode"
              />
              <input 
                type="text" 
                name="landmark"
                value={formData.permanentAddress.landmark}
                onChange={(e) => handleAddressChange(e, 'permanentAddress')}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Landmark"
              />
            </div>

            <div>
              <label className="block font-semibold">Address Proof Type</label>
              <select 
                name="addressProofType" 
                value={formData.addressProofType} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select Address Proof Type</option>
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
                <option value="Ration Card">Ration Card</option>
                <option value="Utility Bill">Utility Bill</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Address Proof Number</label>
              <input 
                type="text" 
                name="addressProofNumber" 
                value={formData.addressProofNumber}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Upload Address Proof</label>
              <input 
                type="file" 
                name="addressProofFile" 
                onChange={handleFileChange} 
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange} 
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div className="col-span-3 flex justify-center">
              <button type="submit" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
