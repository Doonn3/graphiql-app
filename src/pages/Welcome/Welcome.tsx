import './welcom.css';
import Carousel from 'react-bootstrap/Carousel';
import { useTranslation } from 'react-i18next';

function UncontrolledExample() {
  const { t } = useTranslation();
  return (
    <div className="wrap">
      <Carousel>
        <Carousel.Item>
          <Carousel.Caption>
            <div className="wrap_wel-kira">
              <h2>{t('welcome.kira.name')}</h2>
              <ul>
                <li>{t('welcome.kira.job')}</li>
                <li>{t('welcome.kira.country')}</li>
                <li>{t('welcome.kira.position')}</li>
                <li>{t('welcome.kira.description')}</li>
                <li>
                  <a className="git" href="https://github.com/Kira-Vishn9">
                    {t('welcome.kira.git')}
                  </a>
                </li>
              </ul>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <div className="wrap_wel-oly">
              <h2>{t('welcome.oly.name')}</h2>
              <ul>
                <li>{t('welcome.oly.job')}</li>
                <li>{t('welcome.oly.country')}</li>
                <li>{t('welcome.oly.position')}</li>
                <li>{t('welcome.oly.description')}</li>
                <li>
                  <a className="git" href="https://github.com/tizary">
                    {t('welcome.oly.git')}
                  </a>
                </li>
              </ul>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <div className="wrap_wel-koly">
              <h2>{t('welcome.nikoly.name')}</h2>
              <ul>
                <li>{t('welcome.nikoly.job')}</li>
                <li>{t('welcome.nikoly.country')}</li>
                <li>{t('welcome.nikoly.position')}</li>
                <li>{t('welcome.nikoly.description')}</li>
                <li>
                  <a className="git" href="https://github.com/Doonn3">
                    {t('welcome.nikoly.git')}
                  </a>
                </li>
              </ul>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default UncontrolledExample;
