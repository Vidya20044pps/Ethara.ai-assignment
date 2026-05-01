import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch Tasks
  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/tasks/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Create Task
  const createTask = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created");

      fetchTasks();

      setFormData({
        title: "",
        description: "",
        dueDate: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const loadTasks = async () => {
      await fetchTasks();
    };

    loadTasks();

  }, []);

  return (

    <div>

      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Tasks
        </h1>

        {/* Create Task Form */}
        <form
          onSubmit={createTask}
          className="shadow p-6 rounded-xl mb-8"
        >

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="w-full border p-2 mb-4 rounded"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Task Description"
            className="w-full border p-2 mb-4 rounded"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dueDate"
            className="w-full border p-2 mb-4 rounded"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <button
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create Task
          </button>

        </form>

        {/* Task Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >

              <h2 className="text-2xl font-bold">
                {task.title}
              </h2>

              <p className="mt-2">
                {task.description}
              </p>

              <p className="mt-2">
                Status:
                <span className="font-bold ml-2">
                  {task.status}
                </span>
              </p>

              <p className="mt-2">
                Due:
                <span className="ml-2">
                  {task.dueDate?.substring(0, 10)}
                </span>
              </p>

              <div className="flex gap-2 mt-4">

                <button
                  onClick={() =>
                    updateStatus(
                      task._id,
                      "pending"
                    )
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      task._id,
                      "in-progress"
                    )
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  In Progress
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      task._id,
                      "completed"
                    )
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Completed
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Tasks;