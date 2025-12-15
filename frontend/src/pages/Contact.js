import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
   //   const response = await fetch("http://localhost:5000/api/contact", {
  const res = await fetch(
  `${process.env.REACT_APP_API_URL}/api/contact`,
  {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`\u2705 Thank you, ${form.name}!\nYour message has been received.\nWe'll contact you soon at ${form.email}.`);
        setForm({ name: '', email: '', message: '' });
      } else {
        alert("\u274C Failed to send message. Please try again later.");
        console.error(data);
      }
    } catch (error) {
      alert("\u274C Server error. Please check your internet or server.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="container contact-container py-5">
      <h3 className="text-center mb-4">Contact Us</h3>

      <div className="contact-info mb-4">
        <p><strong>Email:</strong> bargainingbazzar@gmail.com</p>
        <p><strong>Phone/WhatsApp:</strong> +91 98765 43210</p>
        <p> <strong>Hours:</strong> Mon–Sat, 9 AM – 7 PM</p>
      </div>

      <h5 className="mb-3"> Message Us</h5>
      <form onSubmit={sendMessage}>
        <div className="mb-3">
          <input type="text" className="form-control" id="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" id="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea className="form-control" id="message" rows="4" placeholder="Your Message" value={form.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">Send Message</button>
      </form>

      <hr className="my-4" />

      <div className="text-center">
        <h6> Follow Us</h6>
        <div className="social-icons mb-2">
          <a href="#" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noreferrer" className="ms-3">Facebook</a>
          <a href="#" target="_blank" rel="noreferrer" className="ms-3">Twitter</a>
        </div>
        <p><a href="https://www.bargainingbazzar.com" target="_blank" rel="noreferrer">www.bargainingbazzar.com</a></p>
      </div>
    </div>
  );
};

export default Contact;
