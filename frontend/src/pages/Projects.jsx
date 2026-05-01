import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch projects
  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/projects/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Create project
  const createProject = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/projects/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Created");

      fetchProjects();

      setFormData({
        title: "",
        description: "",
      });

    } catch (error) {
      console.log(error);
    }
  };
useEffect(() => {

  const loadProjects = async () => {
    await fetchProjects();
  };

  loadProjects();

}, []);

  return (

    <div>

      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Projects
        </h1>

        {/* Create Project Form */}
        <form
          onSubmit={createProject}
          className="mb-8 shadow p-6 rounded-xl"
        >

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            className="w-full border p-2 mb-4 rounded"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Project Description"
            className="w-full border p-2 mb-4 rounded"
            value={formData.description}
            onChange={handleChange}
          />

          <button
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create Project
          </button>

        </form>

        {/* Project List */}
        <div className="grid md:grid-cols-2 gap-6">

          {projects.map((project) => (

            <div
              key={project._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >

              <h2 className="text-2xl font-bold">
                {project.title}
              </h2>

              <p className="mt-2">
                {project.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Projects;