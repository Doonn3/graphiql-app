import { NavLink, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { auth, logout } from '@shared/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

function NavAuth() {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <>
      {user ? (
        <Nav.Link onClick={logoutUser}>{t('header.SO')}</Nav.Link>
      ) : (
        <>
          <Nav.Link as={NavLink} to="/login">
            {t('header.SI')}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/singup">
            {t('header.SU')}
          </Nav.Link>
        </>
      )}
    </>
  );
}

export default NavAuth;
