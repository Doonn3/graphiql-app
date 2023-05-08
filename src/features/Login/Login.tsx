import { logInWithEmailAndPassword } from '../../firebase/firebase';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleChangeLogActive } from '../../store/appSlice';
import { useForm } from 'react-hook-form';
import './Login.css';

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logIn = (value: LoginData) => {
    logInWithEmailAndPassword(value.email, value.password);
    navigate('/main', { replace: true });
    dispatch(handleChangeLogActive(false));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(logIn)}>
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
              required: 'Enter 6 or more symbols',
              minLength: {
                value: 6,
                message: 'Enter 6 or more symbols',
              },
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </Form.Group>
        <Button variant="dark" type="submit">
          Sing In
        </Button>
      </Form>
    </>
  );
}

export default Login;
