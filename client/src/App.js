import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    message: "",
    success: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const backendUrl = "http://localhost:4000/submit-form"; // Replace with your backend URL

    try {
      const response = await axios.get(backendUrl, {
        params: {
          name: formData.name,
          email: formData.email,
        },
      });

      if (response.status === 200) {
        setSubmissionStatus({
          message: "Form submitted successfully!",
          success: true,
        });
      } else {
        setSubmissionStatus({
          message: "Form submission failed. Please try again later.",
          success: false,
        });
      }
    } catch (error) {
      setSubmissionStatus({
        message:
          "An error occurred while submitting the form. Please try again later.",
        success: false,
      });
    } finally {
      setFormData({
        name: "",
        email: "",
      });
    }
  };

  return (
    <div className="App">
      <h1>Contact Information</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {submissionStatus.message && (
        <div className={submissionStatus.success ? "success" : "error"}>
          {submissionStatus.message}
        </div>
      )}
    </div>
  );
}

export default App;
