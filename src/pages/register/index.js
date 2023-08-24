import { useState,useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { uiAction } from '@/store/store_login';
import { useRouter } from 'next/router';
export default function Register() {
const dispatch = useDispatch()
const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
useEffect(() => {
    dispatch(uiAction.toggleOutSideBar())
}, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', {
        username,
        password,
        fullname,
        email,
      });
      if(response.data){
        router.push('/login')
      console.log(response);
      }
      // Handle response as needed, e.g. redirect to login page
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  const handleReset = () => {
    setUsername('');
    setPassword('');
    setFullname('');
    setEmail('');
  };
  return (
    <Container className=" d-flex flex-wrap justify-content-center align-items-center vh-100 ">
      <Form onSubmit={handleSubmit} className="border col-lg-6 col-md-9 col-sm-12   p-4 rounded mb-4 align-content-center">
        <h1 className="fs-2 fw-bold p-2">Register</h1>
        <Form.Group className="mb-3">
        <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="current-username"
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
            autoComplete="current-password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 ">
        <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="outline-success" type="submit">
          Register
        </Button>
        <Button variant="outline-primary" onClick={handleReset} type="reset" className='ms-2'>
          Reset
        </Button>
      </Form>
    </Container>
  );
}
