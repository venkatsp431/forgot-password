// ResetPasswordForm.js
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function Reset() {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Extract the token from the URL, you can use a router library for this

    try {
      const response = await fetch(
        `https://pass1-nfht.onrender.com/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (response.status === 200) {
        // Password reset successful
        // Redirect or show a success message as needed

        navigate("/");
        handleShow();
      } else {
        // Handle password reset error
        console.error("Password reset failed");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reset Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Password Changed Successfully. Please Login to continue
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
}

export default Reset;
