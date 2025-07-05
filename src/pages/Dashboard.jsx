import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";

function Dashboard() {
  const { token, apiUrl, todos, fetchAllTodos, isLoading, setIsLoading } =
    useContext(StoreContext);

  useEffect(() => {
    //get all todos on dashboard
    fetchAllTodos();
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoId, setTodoId] = useState("");

  function clearForm() {
    setDescription("");
    setTitle("");
    setTodoId("");
  }

  async function toggleCompleted(id, checkboxStatus) {
    console.log("Checkbox value sent to backend:", checkboxStatus);

    try {
      const response = await fetch(`${apiUrl}/todos/checkbox/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: checkboxStatus }),
      });
      console.log("Checkbox value sent to backend:", checkboxStatus);

      const data = await response.json();
      if (response.ok) {
        fetchAllTodos();
      } else {
        console.log(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  }

  async function updateHandler() {
    try {
      setIsLoading(true);

      //send update request
      const response = await fetch(`${apiUrl}/todos/update/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        //send msg notification
        toast.success(data.message);

        //clear form
        clearForm();

        //refetch all todos
        fetchAllTodos();
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function deleteBook(todoId) {
    try {
      //confirm deletion
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this todo item?"
      );

      if (!userConfirmed) {
        toast.error("Deletion cancelled");
        return;
      }

      setIsLoading(true);
      //send delete request
      const response = await fetch(`${apiUrl}/todos/delete/${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);

        //refetch all todos
        fetchAllTodos();
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function createTodo() {
    try {
      setIsLoading(true);

      //send post request
      const response = await fetch(`${apiUrl}/todos/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Todo created");

        clearForm();
        fetchAllTodos();
      } else {
        toast.error(data.message || "Failed to add todo");
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function submitHandler() {
    // e.preventDefault();
    createTodo();
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <form
        className="bg-white shadow-md mt-14 rounded px-8 pt-6 pb-8 mb-4 mx-auto w-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          editMode ? updateHandler() : submitHandler();
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            disabled={isLoading ? true : false}
            className={
              editMode
                ? "text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            }
            type="submit"
          >
            {editMode ? "Update todo" : "Add todo"}
          </button>
        </div>
      </form>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id} className="bg-gray-50 border-b">
                  <td className="py-4 px-6 text-blue-700 font-semibold">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() =>
                          toggleCompleted(todo.id, !todo.completed)
                        }
                      />
                      <span
                        className={
                          todo.completed ? "line-through text-gray-400" : ""
                        }
                      >
                        {todo.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {todo.completed ? (
                      <span className="text-green-600 font-semibold">
                        Completed
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/todo/${todo.id}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                    >
                      View more
                    </Link>

                    <button
                      onClick={() => {
                        setEditMode(true);
                        setDescription(todo.description);
                        setTitle(todo.title);
                        setTodoId(todo.id);
                      }}
                      type="button"
                      className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        deleteBook(todo.id);
                      }}
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Dashboard;
