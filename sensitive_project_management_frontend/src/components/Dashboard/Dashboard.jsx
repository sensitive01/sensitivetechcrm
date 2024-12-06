import React from 'react';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-28">
      {/* Total Employee */}
      <div className="bg-white rounded-xl shadow-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-1xl  text-gray-800">Total Employee</h3>
            <p className="text-2xl font-bold text-gray-800 mt-4">10</p>
          </div>
          <div className="p-5 bg-green-100 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Attendance */}
      <div className="bg-white rounded-xl shadow-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-1xl  text-gray-800">Attendance</h3>
            <p className="text-2xl font-bold text-gray-800 mt-4">13</p>
          </div>
          <div className="p-5 bg-blue-100 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Total Account Balance */}
      <div className="bg-white rounded-xl shadow-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-1xl  text-gray-800">Total Projects</h3>
            <p className="text-2xl font-bold text-gray-800 mt-4">200+</p>
          </div>
          <div className="p-5 bg-orange-100 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="bg-white rounded-xl shadow-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-1xl text-gray-800">Tasks</h3>
            <p className="text-2xl font-bold text-gray-800 mt-4">4</p>
          </div>
          <div className="p-5 bg-blue-100 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Clients */}
      <div className="bg-white rounded-xl shadow-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-1xl  text-gray-800">Clients</h3>
            <p className="text-2xl font-bold text-gray-800 mt-4">18</p>
          </div>
          <div className="p-5 bg-orange-100 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Leave */}
      <div className="bg-white rounded-xl shadow-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-1xl  text-gray-800">Leave</h3>
            <p className="text-2xl font-bold text-gray-800 mt-4">0</p>
          </div>
          <div className="p-5 bg-orange-100 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
