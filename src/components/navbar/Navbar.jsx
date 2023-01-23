import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserProfile from '../../assets/images/UserProfile.png'
import Search from '../search/Search'

function Navbar() {
  return (
    <nav className='navbar'>
        <div className="logo">Gamers Stop</div>
        <Search />
        <ul className='navlist'>
            <li className="navlist-item">About</li>
            <li className="navlist-item">Contact</li>
            <li className="navlist-item">Login</li>
            <li className="navlist-item">Register</li>
            <li className="navlist-item cart"><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></li>
            <li className="navlist-item user-profile"><img src={UserProfile} alt="User" /></li>
        </ul>
    </nav>
  )
}

export default Navbar