import './navbar.css'
import UserProfile from '../../assets/images/UserProfile.png'
import Search from '../search/Search'
import {AiOutlineShoppingCart} from "react-icons/ai"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar'>
        <div className="logo"><Link to='/'>Gamers Stop</Link></div>
        <Search />
        <ul className='navlist'>
            <li className="navlist-item">About</li>
            <li className="navlist-item">Contact</li>
            <li className="navlist-item">Login</li>
            <li className="navlist-item">Register</li>
            <li className="navlist-item cart"><span><AiOutlineShoppingCart /></span> Cart</li>
            <li className="navlist-item user-profile"><img src={UserProfile} alt="User" /></li>
        </ul>
    </nav>
  )
}

export default Navbar