import axios from 'axios'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
    const [error, setError] = useState("")

  const forgotHandler = async(e) => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json',
      }
    }

    try {
      const {data} = await axios.post("/forgotpassword", {
        email
      }, config)

      toast.success(data.data);
      
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(()=> {
        setError("");
      }, 5000)
    }

  }

  return <Container className='py-5'>
  <Form onSubmit={forgotHandler}>
      
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

      <Button variant="primary" type="submit">
          send email
      </Button>
  </Form>
</Container>
}

export default ForgotPassword