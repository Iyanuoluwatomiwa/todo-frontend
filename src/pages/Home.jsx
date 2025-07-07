import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f8fafc] px-4 pb-20 lg:pb-32">
      <div className="flex flex-col items-center max-w-7xl mx-auto space-y-8 py-12">
        <h1 className="mt-16 text-4xl sm:text-5xl md:text-6xl font-bold text-[#1e293b] text-center">
          Todo-App: The Ultimate Task Management Tool
        </h1>

        <p className="text-base sm:text-lg font-semibold text-[#475569] text-center">
          Get organized, prioritize tasks and take control of your daily
          activities with our intuitive and user-friendly app.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
          <div className="flex flex-col items-center bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold">
              Create and Manage Tasks
            </h2>
            <p className="mt-2 text-sm sm:text-base text-center">
              Create, edit and delete tasks with a simple and intuitive
              interface.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold">
              Prioritize and Organize
            </h2>
            <p className="mt-2 text-sm sm:text-base text-center">
              Assign tasks to categories, view your tasks for reminders, and
              prioritize them to ensure maximum productivity.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold">Track Progress</h2>
            <p className="mt-2 text-sm sm:text-base text-center">
              Keep track of your tasks and see how much you've accomplished with
              a simple checkbox.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <button className="bg-[#facc15]/90 px-5 py-2 rounded-full font-semibold hover:bg-[#ffb700]/90 transition">
              Sign Up and Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-[#3b82f6]/90 px-5 py-2 rounded-full font-semibold hover:bg-[#0099cc]/90 transition text-white">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
