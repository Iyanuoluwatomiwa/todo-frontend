import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  //define variables
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [todos, setTodos] = useState([]);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  function isTokenExpired(token) {
    if (!token) return;

    try {
      const [, payload] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.exp * 1000 < Date.now();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const localStorageToken = localStorage.getItem("todoApp_token");

    // Check if the token exists and whether it is expired
    const tokenExpired = isTokenExpired(localStorageToken);

    if (localStorageToken && tokenExpired === false) {
      setToken(localStorageToken);
      setIsAuth(true);
    } else {
      setIsAuth(false);
      if (localStorageToken) {
        localStorage.removeItem("todoApp_token");
        toast.error("Session expired. Please log in again."); //  notify user
      }
    }
  }, []);

  async function fetchAllTodos() {
    try {
      const response = await fetch(`${apiUrl}/todos/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        setTodos(data.todos);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //exporting states/functions/data
  const contextObj = {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    apiUrl,
    isLoading,
    setIsLoading,
    isAuth,
    setIsAuth,
    showPassword,
    setShowPassword,
    token,
    setToken,
    todos,
    setTodos,
    fetchAllTodos,
  };

  return (
    <StoreContext.Provider value={contextObj}>{children}</StoreContext.Provider>
  );
};
