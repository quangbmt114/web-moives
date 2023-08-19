import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', {
        username,
        password,
        fullname,
        email,
      });
      console.log(response);
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
    <Container className="d-flex justify-content-center align-items-center vh-100 ">
      <Form onSubmit={handleSubmit} className="border p-4 rounded col-4 mb-4 align-content-center">
        <h1 className="">Register</h1>
        <Form.Group className="mb-3">
        <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
        <Button variant="primary" onClick={handleReset} type="reset" className='ms-2'>
          Reset
        </Button>
      </Form>
    </Container>
  );
}
