import { auth, registerWithEmailAndPassword } from '../../shared/firebase/firebase';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface SingupData {
  name: string;
  email: string;
  password: string;
}

function Singup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingupData>();

  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate('/main');
    }
  }, [user, loading, navigate]);

  const singUp = (value: SingupData) => {
    registerWithEmailAndPassword(value.email, value.password);
  };

  return (
    <>
      <Container className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="w-50 p-5 border rounded ">
          <Form onSubmit={handleSubmit(singUp)}>
            <h1 className="h3 mb-3 text-center">Please Sign up</h1>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your First Name and Last Name"
                {...register('name', {
                  required: 'Enter more then 3 symbols',
                  minLength: {
                    value: 3,
                    message: 'Enter more then 3 symbols',
                  },
                })}
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </Form.Group>

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
                  // "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </Form.Group>
            <Button variant="dark" type="submit">
              Sing Up
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Singup;
