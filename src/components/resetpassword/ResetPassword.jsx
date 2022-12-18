import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const {resetToken} = useParams();
  // const {id} = useParams();
    const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
const navigate = useNavigate();
  const resetHandler = async(e) => {
    e.preventDefault();

    const config = {
        header: {
            'Content-Type': 'application/json',
        }
    }

    if(password !== confirmpassword) {
        setPassword("");
        setConfirmPassword("");
        setTimeout(()=> {
            setError("");
        }, 5000);

        return setError("Password credentials do not match");
    }

    try {
        const {data} = await axios.put(`/resetpassword/${resetToken}`, {
            password
        }, config);

        console.log(data);
        toast.success(data.data);
        navigate("/login");
    } catch (error) {
        setError(error.response.data.error);
        setTimeout(()=> {
            setError("");
        }, 5000);
    }
  }
  return (
    <Container className="py-5">
      <Form onSubmit={resetHandler}>
        <h2>Reset Password</h2>

        {error && <h1>{error}</h1>}

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
  )
}

export default ResetPassword