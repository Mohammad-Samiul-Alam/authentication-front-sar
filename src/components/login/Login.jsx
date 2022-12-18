import axios from 'axios'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const loginHandler = async(e) => {
        e.preventDefault();

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const {data} = await axios.post("/login", {
                email, password
            }, config)
            localStorage.setItem("authToken", data.token );
            localStorage.setItem("email", email);
            navigate("/user");
            toast.success("Login Successfully");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=> {
                setError("");
            }, 5000)
        }
    }
  return (
    <Container className='py-5'>
        <Form onSubmit={loginHandler}>
            {/* <Form.Group className="mb-3">
                <Form.Label>User name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
            </Form.Group> */}
            
            <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          {error && <h2>{error}</h2>}
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

            <Button variant="primary" type="submit">
                Login
            </Button>
            <Link to="/forgotpassword" className='text-decoration-none ms-3'>Forgot Password</Link>
        </Form>
    </Container>
  )
}

export default Login