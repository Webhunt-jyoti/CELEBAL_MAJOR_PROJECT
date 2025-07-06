import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📩 Password reset email sent!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          type="submit"
        >
          Send Reset Link
        </button>
        {message && (
          <p className="mt-4 text-center text-green-700 text-sm font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
