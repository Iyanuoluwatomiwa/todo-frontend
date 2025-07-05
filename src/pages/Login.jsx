//login page
import { useState, useContext, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { StoreContext } from "../context/StoreContext";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const {
    password,
    setPassword,
    email,
    setEmail,
    apiUrl,
    isLoading,
    setIsLoading,
    setIsAuth,
    isAuth,
    setToken,
  } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth]);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message[0].message); // joi message
        toast.error(data.message); 
        setIsLoading(false);
        return;
      }

      // console.log(data.access_token);

      //save on local storage
      localStorage.setItem("todoApp_token", data.access_token);
      setToken(data.access_token);

      toast.success("login successful");
      setIsAuth(true);
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Log In</h2>
        <form className="mt-6" onSubmit={submitHandler}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "password" : "text"}
              id="password"
              className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black pt-[9px] mt-4"
              onClick={toggle}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </div>
          <div className="text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-500">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
