import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";

function Register() {
  const {
    password,
    setPassword,
    email,
    setEmail,
    apiUrl,
    isLoading,
    setIsLoading,
    showPassword,
    setShowPassword,
    name,
    setName,
  } = useContext(StoreContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const navigate = useNavigate();

  function clearForm() {
    setEmail("");
    setPassword("");
    setName("");
  }

  async function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (email.length < 6) {
      toast.error("Email must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message[0]?.message || data.message || "Error occurred"
        );
        setIsLoading(false);
        return;
      }

      toast.success(data.message);

      clearForm();
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  function toggle() {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 sm:py-12">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="********"
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black pt-[9px] mt-4"
              onClick={toggle}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-500">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
