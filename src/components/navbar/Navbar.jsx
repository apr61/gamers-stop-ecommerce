import './navbar.css'
import UserProfile from '../../assets/images/UserProfile.png'
import Search from '../search/Search'
import {AiOutlineShoppingCart} from "react-icons/ai"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar'>
        <div className="navbar__logo"><Link to='/' className='navbar__link'>Gamers Stop</Link></div>
        <Search />
        <ul className='navbar__list'>
            <li className="navbar__list-item">About</li>
            <li className="navbar__list-item">Contact</li>
            <li className="navbar__list-item">Login</li>
            <li className="navbar__list-item">Register</li>
            <li className="navbar__list-item navbar__list-item--cart">
              <span className='navbar__cart-icon'><AiOutlineShoppingCart /></span> Cart
            </li>
            <li className="navbar__list-item navbar__list-item--user-profile">
              <img src={UserProfile} alt="User" />
            </li>
        </ul>
    </nav>
  )
}

export default Navbar