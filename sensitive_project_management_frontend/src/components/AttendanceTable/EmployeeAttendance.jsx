import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';

const EmployeeAttendance = () => {
  // State to hold the captured photo
  const [photo, setPhoto] = useState(null);
  
  // State to hold attendance details
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

  // State to hold submitted data
  const [submittedData, setSubmittedData] = useState(null);

  // State to manage camera status
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isInitializingCamera, setIsInitializingCamera] = useState(false);

  // Reference to the video and canvas elements
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // State to hold the camera stream
  const [cameraStream, setCameraStream] = useState(null);

  /**
   * Function to stop the camera stream
   */
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
      console.log("Camera stopped");
    }
  };

  /**
   * Function to initialize the camera
   */
  const initializeCamera = async () => {
    setIsInitializingCamera(true); // Show loading indicator
    stopCamera(); // Ensure no existing stream is active

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraStream(stream);
      setIsCameraActive(true);
      console.log("Camera initialized");
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsCameraActive(false);
      alert("Unable to access camera. Please check your permissions.");
    } finally {
      setIsInitializingCamera(false); // Hide loading indicator
    }
  };

  /**
   * Effect to handle camera initialization and page visibility changes
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // If the page is not visible, stop the camera
        stopCamera();
      } else {
        // If the page becomes visible and no photo is displayed, reinitialize the camera
        if (!photo && !submittedData) {
          initializeCamera();
        }
      }
    };

    // Add event listener for page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initialize camera on component mount
    initializeCamera();

    // Cleanup on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopCamera();
    };
  }, [photo, submittedData]); // Dependencies include photo and submittedData

  /**
   * Function to capture a photo from the video stream
   */
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      // Draw the current frame from the video onto the canvas
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      // Convert the canvas image to a data URL
      const dataURL = canvasRef.current.toDataURL('image/jpeg');
      setPhoto(dataURL);
      console.log("Photo captured");

      // Stop camera after capturing
      stopCamera();
    }
  };

  /**
   * Function to recapture a photo
   */
  const recapturePhoto = () => {
    setPhoto(null); // Clear the current photo
    initializeCamera(); // Reinitialize the camera
    console.log("Recapturing photo");
  };

  /**
   * Function to handle form submission
   */
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
          {/* Buttons for capturing or recapturing photo */}
          <div className="flex justify-center mb-6 space-x-4">
            {/* Show "Capture Photo" button if no photo is captured and camera is active */}
            {!photo && isCameraActive && (
              <button
                onClick={capturePhoto}
                className="bg-blue-500 text-white p-4 rounded-full flex items-center justify-center"
              >
                <Camera className="mr-2" size={20} />
                Capture Photo
              </button>
            )}

            {/* Show "Recapture" button if a photo is captured */}
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

          {/* Video element for live camera feed */}
          {!photo && isCameraActive && !isInitializingCamera && (
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

          {/* Loading indicator when initializing camera */}
          {isInitializingCamera && (
            <div className="flex justify-center text-gray-500">
              Initializing camera...
            </div>
          )}

          {/* Hidden canvas for capturing photo */}
          <canvas 
            ref={canvasRef} 
            width="300" 
            height="200" 
            className="hidden"
          ></canvas>

          {/* Display the captured photo */}
          {photo && (
            <div className="flex justify-center mt-6">
              <img 
                src={photo} 
                alt="Captured" 
                className="w-64 h-64 rounded-full object-cover shadow-lg" 
              />
            </div>
          )}

          {/* Submit button after capturing a photo */}
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
