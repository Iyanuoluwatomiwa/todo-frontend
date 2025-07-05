import React from 'react'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">Manage your tasks easily</h1>
        <div className="mt-10 grid grid-cols-7 gap-4">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-lg font-semibold">{day}</span>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  style={{ width: `${Math.random() * 100}%` }}
                  className="bg-green-500 h-6 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center space-x-4">
          <Link to="/register">
            <button className="bg-orange-500/90 px-4 py-2 rounded-full font-semibold hover:bg-orange-600/90">
              Sign Up and Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-blue-900/90 px-4 py-2 rounded-full font-semibold hover:bg-blue-800/90">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
