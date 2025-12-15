/* import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/SignupPage.css';

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Use the corrected API route
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message || "Signup successful!");
      
     

      // Clear the form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: ""
      });

      // Redirect to login
      navigate("/Product");
    } catch (err) {
  alert(err.response?.data?.message || "Signup failed. Please try again.");
  console.error("Signup error:", err.response?.data || err.message);
}

  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
 */



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/SignupPage.css';

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   //   const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/auth/signup`,
  formData
);
      alert(res.data.message || "Signup successful!");

      // ✅ Store user info in localStorage for chat/login
      localStorage.setItem("user", JSON.stringify({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile
      }));

      // Clear the form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: ""
      });

      navigate("/Product"); // redirect to product page
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed. Please try again.");
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
