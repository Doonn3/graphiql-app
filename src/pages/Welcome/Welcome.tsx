import './welcom.css';
import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() {
  return (
    <div className="wrap">
      <Carousel>
        <Carousel.Item>
          <Carousel.Caption>
            <div className="wrap_wel-kira">
              <h2>Kira</h2>
              <ul>
                <li>Job title: Developer</li>
                <li>Сountry: Georgia</li>
                <li>Position: ?</li>
                <li>Description: Schrödinger developer. It seems to be, but it seems to be not.</li>
                <li>
                  <a className="git" href="https://github.com/Kira-Vishn9">
                    Git
                  </a>
                </li>
              </ul>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <div className="wrap_wel-oly">
              <h2>Oly</h2>
              <ul>
                <li>Job title: TeamLead</li>
                <li>Сountry: Belarus</li>
                <li>Position: ?</li>
                <li>
                  Description: The main cog in the team directing on the path and telling which
                  <br />
                  choose is better. Yes, and in principle a cheerful gambler.
                </li>
                <li>
                  <a className="git" href="https://github.com/tizary">
                    Git
                  </a>
                </li>
              </ul>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <div className="wrap_wel-koly">
              <h2>Nikoly</h2>
              <ul>
                <li>Job title: Developer</li>
                <li>Сountry: Russia</li>
                <li>Position: ?</li>
                <li>
                  Description: An interesting guy with a clear vision of a clear path <br /> to the
                  operates with facts and documentation.
                </li>
                <li>
                  <a className="git" href="https://github.com/Doonn3">
                    Git
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
