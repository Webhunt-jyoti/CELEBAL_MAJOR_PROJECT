import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 shadow-2xl rounded-xl">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          type="submit"
        >
          Login
        </button>
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-sm text-indigo-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
