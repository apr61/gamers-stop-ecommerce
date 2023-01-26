import './footer.css'
import { AiOutlineFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai'

import { paymentsAvailable } from '../../data/imagesLoader'

function Footer() {
    return (
        <footer>
            <div className="footer-top">
                <section className="footer-section">
                    <h5>Social</h5>
                    <ul className="footer-section-list">
                        <li className="footer-list-item"><AiFillInstagram /> Instagram</li>
                        <li className="footer-list-item"><AiOutlineFacebook /> Facebook</li>
                        <li className="footer-list-item"><AiOutlineTwitter /> Twitter</li>
                        <li className="footer-list-item"><AiFillYoutube /> YouTube</li>
                    </ul>
                </section>
                <section className="footer-section">
                    <h5>Help</h5>
                    <ul className="footer-section-list">
                        <li className="footer-list-item">Payments</li>
                        <li className="footer-list-item">Shipping</li>
                        <li className="footer-list-item">FAQ</li>
                        <li className="footer-list-item">Returns & Cancellation</li>
                    </ul>
                </section>
                <section className="footer-section">
                    <h5>Quick Links</h5>
                    <ul className="footer-section-list">
                        <li className="footer-list-item">Graphic Card</li>
                        <li className="footer-list-item">Monitors</li>
                        <li className="footer-list-item">Consoles</li>
                        <li className="footer-list-item">Gamepad</li>
                        <li className="footer-list-item">Mousepads</li>
                        <li className="footer-list-item">Games</li>
                        <li className="footer-list-item">Routers</li>
                    </ul>
                </section>
                <section className="footer-section">
                    <h5>Contact Us</h5>
                    <p>Demo Street,</p>
                    <p>D/No. 1234, Demo City, Demo Country, 11111</p>
                    <p>Phone : +91 1234567890</p>
                    <p>Mail : support@gamersstop.com</p>
                </section>
            </div>
            <div className="footer-bottom">
                <div className="footer-section">
                    <div className="copy-right">&copy; Gamers Stop</div>
                    <div className="payments">
                        {paymentsAvailable.map((paymethod) => (
                            <div className="payment" key={paymethod.id} title={paymethod.paymentmethod.toUpperCase()}>
                                <img src={paymethod.imageurl} alt={paymethod.paymentmethod} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer