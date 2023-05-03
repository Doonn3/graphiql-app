import Singup from '../Singup/Singup';
import Login from '../Login/Login';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function NavBtn() {
  const [logActive, setLogActive] = useState(false);
  const [singActive, setSingActive] = useState(false);

  const handleClose = () => {
    setLogActive(false);
    setSingActive(false);
  };

  const handleOpenModalLog = () => {
    setLogActive(true);
  };

  const handleOpenModalSing = () => {
    setSingActive(true);
  };

  return (
    <>
      <Button variant="primary" className="mr-2" onClick={handleOpenModalLog}>
        Log In
      </Button>
      <Button variant="primary" onClick={handleOpenModalSing}>
        Sing Up
      </Button>

      <Modal show={logActive || singActive} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {logActive && 'Log in'}
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

export default NavBtn;
