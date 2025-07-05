import { useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Todo() {
  const { token, apiUrl, isLoading, setIsLoading } = useContext(StoreContext);
  const [todo, setTodo] = useState({});

  const navigate = useNavigate();

  const params = useParams();
  const todoId = params.todoId;

  useEffect(() => {
    getTodo();
  }, []);

  async function getTodo() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/todos/single/${todoId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        setTodo(data.todo);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
      <div className="lg:col-start-1">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {todo.title}
        </h2>
        <p className="mt-4 text-gray-500"> {todo.description}</p>
        <button
          type="button"
          className="mt-8 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
      <div className="mt-12 lg:mt-0 lg:col-start-2 lg:row-start-1">
        <img
          src="https://picsum.photos/500/300"
          alt="todo cover"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}
export default Todo;
