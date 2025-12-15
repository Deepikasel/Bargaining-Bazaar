
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/Product");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
     // const res = await fetch("http://localhost:5000/api/auth/login", {
    const res = await fetch(
  `${process.env.REACT_APP_API_URL}/api/auth/login`,
  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Store user info for chat
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userEmail", data.user.email);

      navigate("/Product");
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-lg"/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-lg"/>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
 



