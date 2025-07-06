import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-indigo-700 text-white px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center shadow-md">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="text-2xl font-bold">🛍️ Pyara</Link>
      </div>

      <div className="mt-2 md:mt-0 space-x-4 text-sm md:text-base flex items-center">
        {currentUser && (
          <>
            <Link to="/Home" className="hover:underline">Home</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
          </>
        )}

        {!currentUser && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}

        {currentUser && (
          <>
            <span className="bg-yellow-500 text-black px-2 py-1 rounded-full font-medium">
              👤 {currentUser.email.split("@")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
