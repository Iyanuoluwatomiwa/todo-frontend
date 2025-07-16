import React from "react";
import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { FaTasks } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useContext(StoreContext);

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  return (
    <nav className="bg-gray-800 px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-600">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <FaTasks className="mr-3 h-6 sm:h-9 text-yellow-500" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Todo App
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 5h14a1 1 0 010 2H3a1 1 0 010-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div
          className={`w-full md:flex md:items-center md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 md:mt-0 mt-4 md:text-sm font-medium">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-3 text-white hover:text-yellow-400"
                activeclassname="active"
              >
                Home
              </NavLink>
            </li>

            {isAuth ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="block py-2 px-3 text-white hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className="block py-2 px-3 text-white hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wallet"
                    className="block py-2 px-3 text-white hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Wallet
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signout"
                    className="block py-2 px-3 text-white hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Sign Out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className="block py-2 px-3 text-white hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="block py-2 px-3 text-white hover:text-yellow-400"
                    activeclassname="active"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
