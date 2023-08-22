import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { uiAction } from '@/store/store_login';

export default function Login() {
  const dispatch = useDispatch()
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
        dispatch(uiAction.toggleLogin())
        router.push('/'); // Thay thế đường dẫn bằng trang sau khi đăng nhập thành công
      }else{

      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  useEffect(() => {
    dispatch(uiAction.toggleOutSideBar())
}, []);
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit} className="border p-4 col-lg-6 rounded">
        <h1 className="mb-4 text-lg">Login</h1>
        <Form.Group className="mb-3">
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
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </Form.Group>
        <Button variant="outline-success" type="submit">
          Login
        </Button>
        <Button variant="outline-primary" className='ms-2'>
          <Link href="/register" className=' text-sky-500 hover:text-white text-decoration-none '>REGISTER</Link>
        </Button>
      </Form>
    </Container>
  );
}
