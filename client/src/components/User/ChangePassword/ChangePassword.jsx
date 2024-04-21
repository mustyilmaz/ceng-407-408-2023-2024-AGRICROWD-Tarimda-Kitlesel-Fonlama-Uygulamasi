import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[A-Za-z]/.test(newPassword)) {
      setErrorMessage("Your password must contain at least one letter, one number, and be at least 8 characters long.");
      return;
    }

    const token = Cookies.get('authToken');
    if (!token) {
      setErrorMessage("Session information is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/user/change-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setSuccessMessage("Your password has been successfully changed!");
        setErrorMessage("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(response.data.error || "Password change operation failed.");
      }
    } catch (error) {
      console.error("Error while changing password:", error.response.data);
      setErrorMessage("Password change operation failed. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Change Password</h2>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">Old Password</label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
}

export default ChangePassword;