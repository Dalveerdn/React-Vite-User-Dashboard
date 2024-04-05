import React, { useState } from "react";
import "./Adduser.css";

const AddUserModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const openForm = () => {
    setShowModal(true);
    const modal = document.querySelector(".modal");
    modal.style.display = "flex";
    const userDetails = document.getElementById("userDetails");
    userDetails.style.display = "none";

    // Optionally, clear form data when opening the modal
    setFormData({
      name: "",
      email: "",
      phone: "",
    });
  };

  const closeForm = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("FormData:", formData);
  };

  const handleSubmit = () => {
    fetch(
      "https://b7faf7df-94a8-44e1-a7a3-e5bc301a2ae8-00-36c8vbbyvxtcl.sisko.replit.dev/submit-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        alert("Details submitted successfully!");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        alert("Failed to submit details. Please try again later.");
      });
  };

  return (
    <div>
      <button className="add-user-btn" onClick={openForm}>
        Add user
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-icon" onClick={closeForm}>
              &times;
            </span>
            <h1 className="userDetailFormhead">ADD User Details</h1>
            <form id="detailsForm">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="button"
                className="submitButton"
                id="submitButton"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserModal;
