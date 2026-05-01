import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItem = (path, icon, label) => {

    const active = location.pathname === path;

    return (
      <Link
        to={path}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          active
            ? "bg-white text-black"
            : "text-white hover:bg-gray-800"
        }`}
      >
        {icon}
        {label}
      </Link>
    );
  };

  return (

    <div className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold tracking-wide">
        Team Task Manager
      </h1>

      <div className="flex items-center gap-4">

        {navItem(
          "/dashboard",
          <LayoutDashboard size={18} />,
          "Dashboard"
        )}

        {navItem(
          "/projects",
          <FolderKanban size={18} />,
          "Projects"
        )}

        {navItem(
          "/tasks",
          <CheckSquare size={18} />,
          "Tasks"
        )}

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;