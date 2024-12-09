import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';

const EmployeeAttendance = () => {
  const [photo, setPhoto] = useState(null);
  const [attendanceDetails, setAttendanceDetails] = useState({
    employeeId: "",
    employeeName: "",
    date: "",
    status: "",
    logintime: "",
    logouttime: "",
    projectName: "",
    remarks: "",
  });

  const [submittedData, setSubmittedData] = useState(null); // State to hold the submitted data

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  // Function to stop camera stream
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  };

  // Initialize camera
  const initializeCamera = async () => {
    // Stop any existing stream first
    stopCamera();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraStream(stream);
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsCameraActive(false);
    }
  };

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is not visible, stop camera
        stopCamera();
      } else {
        // Page becomes visible, reinitialize camera
        initializeCamera();
      }
    };

    // Add event listener for page visibility
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial camera setup
    initializeCamera();

    // Cleanup
    return () => {
      // Remove event listener
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Stop camera when component unmounts
      stopCamera();
    };
  }, []);

  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    setPhoto(canvasRef.current.toDataURL('image/jpeg'));
    
    // Stop camera after capturing
    stopCamera();
  };

  const recapturePhoto = () => {
    setPhoto(null);
    initializeCamera();
  };

  const handleSubmit = () => {
    if (!photo) {
      alert("Please capture a photo before submitting.");
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // Get current date and time as a string

    // Prepare the submission data
    const submissionData = {
      photo,
      employeeId: attendanceDetails.employeeId,
      employeeName: attendanceDetails.employeeName,
      date: attendanceDetails.date,
      status: attendanceDetails.status,
      logintime: attendanceDetails.logintime,
      logouttime: attendanceDetails.logouttime,
      projectName: attendanceDetails.projectName,
      remarks: attendanceDetails.remarks,
      submissionDateTime: formattedDate, // Add current date and time to submission
    };

    // Set the submitted data to display
    setSubmittedData(submissionData);

    // Clear the form data (reset the state)
    setPhoto(null);
    setAttendanceDetails({
      employeeId: "",
      employeeName: "",
      date: "",
      status: "",
      logintime: "",
      logouttime: "",
      projectName: "",
      remarks: "",
    });

    // Stop camera after submission
    stopCamera();

    alert(`Attendance details submitted successfully!\nDate and Time: ${formattedDate}`);
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <h2 className="text-4xl font-bold mb-6">Employee Attendance</h2>

      {!submittedData && (
        <div>
          <div className="flex justify-center mb-6 space-x-4">
            {!photo && isCameraActive && (
              <button
                onClick={capturePhoto}
                className="bg-blue-500 text-white p-4 rounded-full flex items-center justify-center"
              >
                <Camera className="mr-2" size={20} />
                Capture Photo
              </button>
            )}

            {photo && (
              <button
                onClick={recapturePhoto}
                className="bg-yellow-500 text-white p-4 rounded-full flex items-center justify-center"
              >
                <Camera className="mr-2" size={20} />
                Recapture
              </button>
            )}
          </div>

          {!photo && isCameraActive && (
            <div className="flex justify-center">
              <video 
                ref={videoRef} 
                autoPlay 
                width="300" 
                height="200" 
                className="border rounded-md"
              ></video>
            </div>
          )}

          <canvas 
            ref={canvasRef} 
            width="300" 
            height="200" 
            className="hidden"
          ></canvas>

          {photo && (
            <div className="flex justify-center mt-6">
              <img 
                src={photo} 
                alt="Captured" 
                className="w-64 h-64 rounded-full object-cover shadow-lg" 
              />
            </div>
          )}

          {/* Submit Button */}
          {photo && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white p-4 rounded-md"
              >
                Submit Details
              </button>
            </div>
          )}
        </div>
      )}

      {/* Display the submitted data */}
      {submittedData && (
        <div className="mt-6 p-6 border rounded-md">
          <h3 className="text-2xl font-semibold">Submitted Attendance Details</h3>
          <div className="flex justify-center mt-6">
            <img 
              src={submittedData.photo} 
              alt="Captured" 
              className="w-64 h-64 rounded-full object-cover shadow-lg" 
            />
          </div>
          <ul className="list-none mt-4">
            <li><strong>Employee ID:</strong> {submittedData.employeeId}</li>
            <li><strong>Name:</strong> {submittedData.employeeName}</li>
            <li><strong>Date:</strong> {submittedData.date}</li>
            <li><strong>Status:</strong> {submittedData.status}</li>
            <li><strong>Check-In Time:</strong> {submittedData.logintime}</li>
            <li><strong>Check-Out Time:</strong> {submittedData.logouttime}</li>
            <li><strong>Project Name:</strong> {submittedData.projectName}</li>
            <li><strong>Remarks:</strong> {submittedData.remarks}</li>
            <li><strong>Submission Date and Time:</strong> {submittedData.submissionDateTime}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;
