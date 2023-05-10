import { logInWithEmailAndPassword } from '../../firebase/firebase';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setAuth } from '../../store/appSlice';
import { useForm } from 'react-hook-form';
import './Login.css';
import { useState } from 'react';
import { RootState } from '../../store/store';

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

  const authUserStatus = useSelector((state: RootState) => state.authUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logIn = async (value: LoginData) => {
    const user = await logInWithEmailAndPassword(value.email, value.password);
    if (typeof user !== 'string') {
      console.log('user');
      dispatch(setAuth(true));
      navigate('/main', { replace: true });
    } else {
      setErr(user);
    }
  };

  return (
    <>
      {authUserStatus ? (
        <Navigate to="/main" />
      ) : (
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
      )}
    </>
  );
}

export default Login;
