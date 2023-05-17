import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import i18n from '@app/i18n';
import { useTranslation } from 'react-i18next';

type Locale = {
  title: string;
};

type Locales = {
  [key: string]: Locale;
};

const locales: Locales = {
  en: { title: 'en' },
  ru: { title: 'ru' },
};

function ChangeLang() {
  const { t, i18n } = useTranslation();
  return (
    <DropdownButton id="dropdown-basic-button" title={t('lang.lang')}>
      {Object.keys(locales).map((locale) => (
        <Dropdown.Item href="#/" key={locale} onClick={() => i18n.changeLanguage(locale)}>
          {t('lang.' + locales[locale].title)}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

function Header(): JSX.Element {
  const { t, i18n } = useTranslation();
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <Row className="w-100">
          <Col md={12} className="d-flex">
            <Navbar.Brand>{t('header.title')}</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                {t('header.welcom')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/main">
                {t('header.main')}
              </Nav.Link>
            </Nav>
            <ChangeLang />
            <Nav className="mr-auto">
              <Nav.Link>{t('header.SI')}</Nav.Link>
              <Nav.Link>{t('header.SU')}</Nav.Link>
              <Nav.Link>{t('header.SO')}</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
