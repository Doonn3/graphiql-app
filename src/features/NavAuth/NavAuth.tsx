import { NavLink, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { auth, logout } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function NavAuth() {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <>
      {user ? (
        <Nav.Link onClick={logoutUser}>Sign Out</Nav.Link>
      ) : (
        <>
          <Nav.Link as={NavLink} to="/login">
            Sign In
          </Nav.Link>
          <Nav.Link as={NavLink} to="/singup">
            Sign Up
          </Nav.Link>
        </>
      )}
    </>
  );
}

export default NavAuth;
