import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


const EmployeeEdit = () => {
  const [isPermanentAddressSame, setIsPermanentAddressSame] = useState(false);
  const { id } = useParams();
  console.log(id)
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const [formData, setFormData] = useState({
    role: '',
    salary: '',
    empId: '',
    name: '',
    gender: '',
    dob: '',
    dobFormatted: '',
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
    dojFormatted: '',
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return { formatted: '', isoDate: '' };
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = String(dateObj.getFullYear()).slice(-2);
    return {
      formatted: `${day}/${month}/${year}`,
      isoDate: dateObj.toISOString().split('T')[0]
    };
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob" || name === "doj") {
      const { formatted, isoDate } = formatDate(value);
      setFormData(prev => ({
        ...prev,
        [name]: isoDate,
        [`${name}Formatted`]: formatted
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0]
    }));
  };

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


  useEffect(() => {
    // Fetch employee data from an API
    const fetchEmployees = async () => {
      try {
        setLoading(true); // Show loader
        const response = await axios.get(
          `https://sensitivetechcrm.onrender.com/getemployeesbyid/${id}`
        );
        console.log(response);
        const employeeData = response.data;
        const { formatted: dobFormatted, isoDate: dobIso } = formatDate(employeeData.dob);
        const { formatted: dojFormatted, isoDate: dojIso } = formatDate(employeeData.doj);

        // Ensure ID Proof Type and Address Proof Type are included in response data
        setFormData((prevData) => ({
          ...prevData,
          ...employeeData,
          dob: dobIso,
          dobFormatted,
          doj: dojIso,
          dojFormatted

        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchEmployees();
  }, [id]);  // Ensure useEffect re-runs when the `id` parameter changes

  const handlePermanentAddressToggle = (e) => {
    setIsPermanentAddressSame(e.target.checked);
    if (e.target.checked) {
      setFormData((prevData) => ({
        ...prevData,
        permanentAddress: { ...prevData.presentAddress }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        permanentAddress: {
          addressLine: '',
          area: '',
          city: '',
          state: '',
          pincode: '',
          landmark: ''
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    console.log(formData);
    try {
      const response = await axios.post(
        "https://sensitivetechcrm.onrender.com/createemployee",
        formData
      );
      console.log("Response:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the form.");
    }
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
              <label className="block font-semibold">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Salary</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
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
                value={formData.idProofType}  // Ensure the value is bound to formData.idProofType
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
              {formData.idProofFile ? (
                <div>
                  {/* Assuming resume is an image */}
                  <img
                    src={formData.idProofFile} // URL of the resume file from the backend
                    alt="idProofFile"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              ) : (
                <p>No idProofFile uploaded</p>
              )}
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
              <label className="block font-semibold">Resume</label>
              {formData.resume ? (
                <div>
                  {/* Assuming resume is an image */}
                  <img
                    src={formData.resume} // URL of the resume file from the backend
                    alt="Resume"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              ) : (
                <p>No resume uploaded</p>
              )}
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

            <div className="col-span-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPermanentAddressSame}
                  onChange={handlePermanentAddressToggle}
                  className="mr-2"
                />
                Permanent address is same as present address
              </label>
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
                value={formData.addressProofType}  // Ensure the value is bound to formData.addressProofType
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
              {formData.addressProofFile ? (
                <div>
                  {/* Assuming resume is an image */}
                  <img
                    src={formData.addressProofFile} // URL of the resume file from the backend
                    alt="idProofFile"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              ) : (
                <p>No addressProofFile uploaded</p>
              )}
              <input
                type="file"
                name="addressProofFile"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Dynamically toggle the type
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Icon */}
                </button>
              </div>
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

export default EmployeeEdit;