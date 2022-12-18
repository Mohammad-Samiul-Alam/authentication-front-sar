import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const registerHandler = async(e) => {
        e.preventDefault();

        const config = {
            header: {
                'Content-Type': 'application/json',
            }
        }

        if(password !== confirmpassword) {
            setPassword("")
            setConfirmPassword("");
            setTimeout(()=> {
                setError("")
            }, 5000);
            return setError("Password credentials do not match");
        }

        try {
            const {data} = await axios.post("/register", {
                name, 
                email,
                password
            }, config);

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("email", email);

            navigate("/user");
            toast.success("Register Successfully");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=> {
                setError("");
            }, 5000);
        }

    }

  return (
    <Container className="py-5">
      <Form onSubmit={registerHandler}>
        <h2>Register</h2>

        {error && <h1>{error}</h1>}
        <Form.Group className="mb-3">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
