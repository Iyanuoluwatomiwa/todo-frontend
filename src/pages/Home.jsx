import React from 'react'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1e293b] text-center mt-12 sm:mt-16 md:mt-20">
          Todo-App: The Ultimate Task Management Tool
        </h1>
        <p className="text-base sm:text-lg font-semibold text-[#475569] text-center mt-4">
          Get organized, prioritize tasks and take control of your daily
          activities with our intuitive and user-friendly app.
        </p>
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col items-center bg-white rounded-lg p-4 mt-4 border-2 border-gray-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold">Create and Manage Tasks</h2>
            <p className="mt-2 text-sm sm:text-base">
              Create, edit and delete tasks with a simple and intuitive
              interface.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg p-4 mt-4 border-2 border-gray-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold">Prioritize and Organize</h2>
            <p className="mt-2 text-sm sm:text-base">
              Set deadlines, assign tasks to categories and prioritize them to
              ensure maximum productivity.
            </p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg p-4 mt-4 border-2 border-gray-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold">Track Progress</h2>
            <p className="mt-2 text-sm sm:text-base">
              Keep track of your tasks and see how much you've accomplished with
              a simple checkbox.
            </p>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 flex items-center justify-center space-x-4">
          <Link to="/register">
            <button className="bg-[#facc15]/90 px-3 sm:px-4 py-2 rounded-full font-semibold hover:bg-[#ffb700]/90">
              Sign Up and Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-[#3b82f6]/90 px-3 sm:px-4 py-2 rounded-full font-semibold hover:bg-[#0099cc]/90">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
