import './footer.css'
import { AiOutlineFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai'


function Footer() {
    return (
        <footer className='footer'>
            <div className="footer__top">
                <section className="footer__section">
                    <h5 className='footer__title'>Social</h5>
                    <ul className="footer__list">
                        <li className="footer__list-item"><AiFillInstagram /> Instagram</li>
                        <li className="footer__list-item"><AiOutlineFacebook /> Facebook</li>
                        <li className="footer__list-item"><AiOutlineTwitter /> Twitter</li>
                        <li className="footer__list-item"><AiFillYoutube /> YouTube</li>
                    </ul>
                </section>
                <section className="footer__section">
                    <h5 className='footer__title'>Help</h5>
                    <ul className="footer__list">
                        <li className="footer__list-item">Payments</li>
                        <li className="footer__list-item">Shipping</li>
                        <li className="footer__list-item">FAQ</li>
                        <li className="footer__list-item">Returns & Cancellation</li>
                    </ul>
                </section>
                <section className="footer__section">
                    <h5 className='footer__title'>Quick Links</h5>
                    <ul className="footer__list">
                        <li className="footer__list-item">Graphic Card</li>
                        <li className="footer__list-item">Monitors</li>
                        <li className="footer__list-item">Consoles</li>
                        <li className="footer__list-item">Gamepad</li>
                        <li className="footer__list-item">Mousepads</li>
                        <li className="footer__list-item">Games</li>
                        <li className="footer__list-item">Routers</li>
                    </ul>
                </section>
                <section className="footer__section">
                    <h5 className='footer__title'>Contact Us</h5>
                    <p className='footer__address'>Demo Street,</p>
                    <p className='footer__address'>D/No. 1234, Demo City, Demo Country, 11111</p>
                    <p className='footer__address'>Phone : +91 1234567890</p>
                    <p className='footer__address'>Mail : support@gamersstop.com</p>
                </section>
            </div>
            <div className="footer__bottom">
                <div className="footer__section footer__section--bottom">
                    <div className="footer__copy-right">&copy; Gamers Stop</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer