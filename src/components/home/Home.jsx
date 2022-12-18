import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const logoutHandler = async(e) => {
    e.preventDefault();
    localStorage.clear("authToken");
    navigate("/login")
    // window.location.reload();
  }
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");

  //   if(!token) {
  //     navigate("/login");
  //   }
  // }, [])
  
  return <>
  <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand><Link to="/" className="text-decoration-none text-light fs-2">Samiul</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/register" className="me-2 text-decoration-none text-info">Register</Link>
            <Link to="/login" className="me-2 text-decoration-none text-info">Login</Link>
          </Nav>
          <Button onClick={logoutHandler} className="btn-danger">Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</>
}

export default Home