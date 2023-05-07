import { logInWithEmailAndPassword } from '../../firebase/firebase';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleChangeLogActive } from '../../store/appSlice';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logInWithEmailAndPassword(userEmail, userPassword);
    navigate('/main', { replace: true });
    dispatch(handleChangeLogActive(false));
  };

  return (
    <>
      <Form onSubmit={logIn}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Sing In
        </Button>
      </Form>
    </>
  );
}

export default Login;
