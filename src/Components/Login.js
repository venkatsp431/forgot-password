import React, { useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to your backend '/login' endpoint with email and password
    try {
      const response = await fetch("https://pass1-nfht.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        // Login successful
        handleShow();
        console.log("Login successful");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container>
      <h1>
        Since chrome marked this site as dangerous, check spam mail for links
      </h1>
      <h2>Welcome Back! Please Login to continue</h2>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Log In
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>Login Successfull</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <p>
          <a href="/forgot">Forgot Password</a>
        </p>
        <p>New User Wanna Signup?</p>
        <Button variant="danger" onClick={() => navigate("/signup")}>
          Signup
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
