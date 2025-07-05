import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";
import Signout from "./layout/Signout";
import Todo from "./pages/Todo";

function App() {
  const { isAuth } = useContext(StoreContext);
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={isAuth ? <Dashboard /> : <Home />} />
          <Route
            path="/register"
            element={isAuth ? <Dashboard /> : <Register />}
          />
          <Route path="/login" element={isAuth ? <Dashboard /> : <Login />} />
          <Route
            path="/dashboard"
            element={isAuth ? <Dashboard /> : <Login />}
          />
          <Route path="/signout" element={isAuth ? <Signout /> : <Login />} />
          <Route path="/todo/:todoId" element={isAuth ? <Todo /> : <Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
