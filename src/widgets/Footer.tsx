import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';
import logo from '../../public/logo-rs.svg';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <MDBFooter className="footer text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                {t('footer.survivors')}
              </h6>
              <p>{t('footer.grapgQl')}</p>
              <a href="https://rs.school/react/">
                <img className="logo" src={logo} alt="rs" />
              </a>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">{t('footer.products')}</h6>
              <p>
                <a href="#!" className="text-reset">
                  {t('welcome.kira.name')}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t('welcome.oly.name')}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t('welcome.nikoly.name')}
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">{t('footer.links')}</h6>
              <p>
                <a href="https://github.com/Kira-Vishn9" className="text-reset">
                  {t('welcome.nikoly.git')}
                </a>
              </p>
              <p>
                <a href="https://github.com/tizary" className="text-reset">
                  {t('welcome.nikoly.git')}
                </a>
              </p>
              <p>
                <a href="https://github.com/Doonn3" className="text-reset">
                  {t('welcome.nikoly.git')}
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">{t('footer.Contact')}</h6>
              <p>
                <MDBIcon icon="home" className="me-3" />
                Kvishn9@gmail.com
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                Tizary@mail.ru
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> Doonn3@mail.ru
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        {t('footer.Copyright')}
        <a className="text-reset fw-bold" href="https://github.com/Doonn3/graphiql-app">
          {t('footer.Project')}
        </a>
      </div>
    </MDBFooter>
  );
}
