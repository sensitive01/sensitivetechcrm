import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';

const EmployeeAttendance = () => {
  const employeeId = localStorage.getItem("empId")
  const [photo, setPhoto] = useState(null);
  const [attendanceDetails, setAttendanceDetails] = useState({
    employeeId: "",
    employeeName: "",
    date: new Date().toLocaleDateString('en-GB'), 
    status: "Present", 
    logintime: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isInitializingCamera, setIsInitializingCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  };

  const initializeCamera = async () => {
    setIsInitializingCamera(true);
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraStream(stream);
      setIsCameraActive(true);
    } catch (error) {
      alert("Unable to access the camera. Please check permissions.");
    } finally {
      setIsInitializingCamera(false);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopCamera();
      } else if (!photo && !submittedData) {
        initializeCamera();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    initializeCamera();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopCamera();
    };
  }, [photo, submittedData]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const dataURL = canvasRef.current.toDataURL("image/jpeg");
      setPhoto(dataURL);
      stopCamera();
    }
  };

  const recapturePhoto = () => {
    setPhoto(null);
    initializeCamera();
  };

  const handleSubmit = async () => {
    if (!photo) {
      alert("Please capture a photo before submitting.");
      return;
    }
  
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toLocaleTimeString();
  
    const submissionData = {
      photo,
      employeeId: employeeId,
      employeeName: attendanceDetails.employeeName,
      date: formattedDate, 
      status: "Present", 
      logintime: formattedTime,
    };
  
    try {
      const response = await fetch("https://sensitivetechcrm.onrender.com/attendance/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Attendance submitted successfully!");
        setSubmittedData(result.attendance);
        setAttendanceDetails({
          employeeId: "",
          employeeName: "",
          date: formattedDate,
          status: "Present",
          logintime: "",
        });
        setPhoto(null);
      } else {
        const error = await response.json();
        alert(`Failed to submit attendance: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Error submitting attendance. Please try again.");
    }
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

          {!photo && isCameraActive && !isInitializingCamera && (
            <div className="flex justify-center">
              <video ref={videoRef} autoPlay className="fullscreen-video"></video>
            </div>
          )}
          {isInitializingCamera && <div className="text-center">Initializing camera...</div>}
          <canvas ref={canvasRef} width="300" height="200" className="hidden"></canvas>
          {photo && (
            <div className="flex justify-center mt-6">
              <img src={photo} alt="Captured" className="w-64 h-64 rounded-full object-cover shadow-lg" />
            </div>
          )}
          {photo && (
            <div className="flex justify-center mt-6">
              <button onClick={handleSubmit} className="bg-green-500 text-white p-4 rounded-md">
                Submit Details
              </button>
            </div>
          )}
        </div>
      )}

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
          <ul className="mt-4">
            <li><strong>Employee ID:</strong> {submittedData.employeeId}</li>
            <li><strong>Name:</strong> {submittedData.employeeName}</li>
            <li><strong>Date:</strong> {submittedData.date}</li>
            <li><strong>Status:</strong> {submittedData.status}</li>
            <li><strong>Login Time:</strong> {submittedData.logintime}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;
