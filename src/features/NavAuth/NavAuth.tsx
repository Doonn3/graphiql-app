import Singup from '../Singup/Singup';
import Login from '../Login/Login';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { handleChangeLogActive, handleChangeSingActive } from '../../store/appSlice';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, logout } from '../../firebase/firebase';

function NavAuth() {
  const logActive = useSelector((state: RootState) => state.appReducer.logActive);
  const singActive = useSelector((state: RootState) => state.appReducer.singActive);

  const [authUser, setAuthUser] = useState<User | null>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const handleClose = () => {
    dispatch(handleChangeLogActive(false));
    dispatch(handleChangeSingActive(false));

    navigate('/', { replace: true });
  };

  const handleOpenModalLog = () => {
    dispatch(handleChangeLogActive(true));
  };

  const handleOpenModalSing = () => {
    dispatch(handleChangeSingActive(true));
  };

  return (
    <>
      <Nav.Link as={NavLink} to="/singup" onClick={handleOpenModalSing}>
        Sign Up
      </Nav.Link>
      {authUser ? (
        <Nav.Link onClick={logout}>Sign Out</Nav.Link>
      ) : (
        <Nav.Link as={NavLink} to="/login" onClick={handleOpenModalLog}>
          Sign In
        </Nav.Link>
      )}

      <Modal
        show={logActive || singActive}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {logActive && 'Sing in'}
            {singActive && 'Sing up'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {logActive && <Login />}
          {singActive && <Singup />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavAuth;
