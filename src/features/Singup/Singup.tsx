import { registerWithEmailAndPassword } from '../../firebase/firebase';
// import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleChangeSingActive } from '../../store/appSlice';
import { useForm } from 'react-hook-form';

interface SingupData {
  name: string;
  email: string;
  password: string;
}

function Singup() {
  // const [userName, setUserName] = useState('');
  // const [userEmail, setUserEmail] = useState('');
  // const [userPassword, setUserPassword] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingupData>();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const singUp = (value: SingupData) => {
    registerWithEmailAndPassword(value.email, value.password);
    navigate('/', { replace: true });
    dispatch(handleChangeSingActive(false));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(singUp)}>
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
          Sing Up
        </Button>
      </Form>
    </>
  );
}

export default Singup;
