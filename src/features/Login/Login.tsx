import { auth, logInWithEmailAndPassword } from '../../firebase/firebase';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Login.css';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const [err, setErr] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate('/main');
    }
  }, [user, loading, navigate]);

  const logIn = async (value: LoginData) => {
    const user = await logInWithEmailAndPassword(value.email, value.password);
    if (typeof user !== 'string') {
      return;
    } else {
      setErr(user);
    }
  };

  return (
    <>
      <Container className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="w-50 p-5 border rounded ">
          <Form onSubmit={handleSubmit(logIn)}>
            <h1 className="h3 mb-3 text-center">Please Sign in</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register('email', {
                  required: 'Invalid email address',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password', {
                  required:
                    'Minimum eight characters, at least one letter, one number and one special character',
                  minLength: {
                    value: 8,
                    message:
                      'Minimum eight characters, at least one letter, one number and one special character',
                  },
                })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </Form.Group>
            {err && <div className="mb-3 text-danger">{err}</div>}
            <Button variant="dark" type="submit">
              Sing In
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Login;
