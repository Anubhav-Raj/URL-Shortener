/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
import { useUser } from "../Provider/UserContext";

function header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div
        className={`${
          open ? "w-full" : "w-20 "
        } bg-purple-950 h-20 p-5 pt-8 relative duration-300 flex justify-between items-center`}
      >
        <div>
          <h1 className="text-2xl font-semibold mb-6 text-white  ">
            anchors.in
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-white font-semibold">
            {user ? `Welcome, ${user.name}` : null}
          </span>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default header;
