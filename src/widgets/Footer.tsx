import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>{t('footer.social')}</span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                {t('footer.survivors')}
              </h6>
              <p>{t('footer.grapgQl')}</p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">{t('footer.products')}</h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">{t('footer.links')}</h6>
              <p>
                <a href="#!" className="text-reset">
                  {t('footer.Pricing')}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t('footer.Settings')}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t('footer.Orders')}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t('footer.Help')}
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">{t('footer.Contact')}</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                {t('footer.Сountry')}
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                Kvishn9@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> Tizary@mail.ru
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 99 55 711 15 37 9
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
