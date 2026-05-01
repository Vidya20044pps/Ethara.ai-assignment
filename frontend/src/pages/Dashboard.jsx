import { useEffect, useState } from "react";

import {
  ClipboardList,
  CheckCircle,
  Clock3,
  Loader,
  AlertTriangle,
} from "lucide-react";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await API.get(
          "/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();

  }, []);

  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: <ClipboardList size={32} />,
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: <CheckCircle size={32} />,
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: <Clock3 size={32} />,
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: <Loader size={32} />,
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      icon: <AlertTriangle size={32} />,
    },
  ];

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-8">

        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {cards.map((card, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >

              <div className="flex justify-between items-center mb-4 text-black">
                {card.icon}
              </div>

              <h2 className="text-lg text-gray-500 font-medium">
                {card.title}
              </h2>

              <p className="text-4xl font-bold mt-4 text-black">
                {card.value || 0}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;