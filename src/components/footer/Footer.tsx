import { Link } from "react-router-dom";
import "./footer.css";
import { GithubOutlined, TwitterOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <footer className="footer border-t border-border">
      <div className="footer__top">
        <section className="footer__section">
          <h2 className="footer__title footer__title--bg">Gamers Stop</h2>
          <p>A perfect stop for every gamer around the world.</p>
          <ul className="footer__list">
            <li className="footer__list-item">
              <Link to="https://github.com/apr61" className="footer__link">
                <GithubOutlined />
              </Link>
            </li>
            <li className="footer__list-item">
              <Link
                to="https://twitter.com/apradeepreddy9"
                className="footer__link"
              >
                <TwitterOutlined />
              </Link>
            </li>
          </ul>
        </section>
        <section className="footer__section">
          <h5 className="footer__title">Quick Links</h5>
          <ul className="footer__list footer__list--col">
            <li className="footer__list-item">
              <Link to="/store" className="footer__link">
                Store
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/cart" className="footer__link">
                Cart
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/account" className="footer__link">
                Account
              </Link>
            </li>
          </ul>
        </section>
        <section className="footer__section">
          <h5 className="footer__title">Contact Us</h5>
          <p className="footer__address">Unknown street,</p>
          <p className="footer__address">
            Unknown City, Unknown Country, 00000
          </p>
          <p className="footer__address">Phone : 0000000000</p>
          <p className="footer__address">Mail : support@gamersstop.com</p>
        </section>
      </div>
      <div className="footer__bottom border-t border-border">
        <div className="footer__section footer__section--bottom">
          <div className="footer__copy-right">
            &copy; 2023 - {new Date().getFullYear()} Gamers Stop
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
