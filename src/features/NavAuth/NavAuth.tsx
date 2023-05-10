import { NavLink, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeUser, setAuth } from '../../store/appSlice';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logout } from '../../firebase/firebase';

function NavAuth() {
  const authUserStatus = useSelector((state: RootState) => state.authUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }
    });
    return () => {
      listen();
    };
  }, [authUserStatus, dispatch]);

  const logoutUser = () => {
    logout();
    dispatch(setAuth(false));
    navigate('/', { replace: true });
  };

  console.log(authUserStatus);

  return (
    <>
      {authUserStatus ? (
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
