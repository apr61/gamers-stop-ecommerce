import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";

function Footer() {
  return (
    <footer className="border-t border-slate-300">
      <div className="p-2 pl-8 max-w-4xl mx-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 md:p-4">
        <section className="mb-2">
          <h5 className="text-xl font-bold mb-1">Social</h5>
          <ul className="footer__list">
            <li className="flex items-center gap-2 text-lg">
              <AiFillInstagram /> Instagram
            </li>
            <li className="flex items-center gap-2 text-lg">
              <AiOutlineFacebook /> Facebook
            </li>
            <li className="flex items-center gap-2 text-lg">
              <AiOutlineTwitter /> Twitter
            </li>
            <li className="flex items-center gap-2 text-lg">
              <AiFillYoutube /> YouTube
            </li>
          </ul>
        </section>
        <section className="mb-2">
          <h5 className="text-xl font-bold mb-1">Help</h5>
          <ul className="">
            <li className="flex items-center gap-2 text-lg">Payments</li>
            <li className="flex items-center gap-2 text-lg">Shipping</li>
            <li className="flex items-center gap-2 text-lg">FAQ</li>
            <li className="flex items-center gap-2 text-lg">
              Returns & Cancellation
            </li>
          </ul>
        </section>
        <section className="mb-2">
          <h5 className="text-xl font-bold mb-1">Quick Links</h5>
          <ul className="footer__list">
            <li className="flex items-center gap-2 text-lg">Graphic Card</li>
            <li className="flex items-center gap-2 text-lg">Monitors</li>
            <li className="flex items-center gap-2 text-lg">Consoles</li>
            <li className="flex items-center gap-2 text-lg">Gamepad</li>
            <li className="flex items-center gap-2 text-lg">Mousepads</li>
            <li className="flex items-center gap-2 text-lg">Games</li>
            <li className="flex items-center gap-2 text-lg">Routers</li>
          </ul>
        </section>
        <section className="mb-2">
          <h5 className="text-xl font-bold mb-1">Contact Us</h5>
          <p className="footer__address">Demo Street,</p>
          <p className="footer__address">
            D/No. 1234, Demo City, Demo Country, 11111
          </p>
          <p className="footer__address">Phone : +91 1234567890</p>
          <p className="footer__address">Mail : support@gamersstop.com</p>
        </section>
      </div>
      <div className="border-t border-slate-300 p-4 text-xl">
        <p className="text-center">&copy; Gamers Stop</p>
      </div>
    </footer>
  );
}

export default Footer;
