import { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Link from 'next/link';


export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      if (response.data.token) {
        document.cookie = `token=${response.data.token}`;
        router.push('/'); // Thay thế đường dẫn bằng trang sau khi đăng nhập thành công
      }else{

      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit} className="border p-4 rounded">
        <h1 className="mb-4">Login</h1>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
        <Button variant="primary" className='ms-2'>
          <Link href="/register" className='text-light text-decoration-none '>REGISTER</Link>
        </Button>
      </Form>
    </Container>
  );
}
