// ForgotPasswordForm.js
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Forgot() {
  const [email, setEmail] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // e.preventDefault();
    setShow(true);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://pass1-nfht.onrender.com/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.status === 200) {
        // Email sent successfully
        // Redirect or show a success message as needed
        handleShow();
      } else {
        // Handle email sending error
        console.error("Email sending failed");
      }
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Email</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Link Sent Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>Kindly check Email to Login</Modal.Body>
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

export default Forgot;
