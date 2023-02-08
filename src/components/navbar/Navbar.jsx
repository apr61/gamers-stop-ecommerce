import './navbar.css'
import Search from '../search/Search'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCartState } from '../../context/CartContext'
import { useAuthContext } from '../../context/AuthContext'
import { logOut } from '../../services/auth'
import { BiChevronDown } from 'react-icons/bi'

function Navbar() {
	const { getTotalItems } = useCartState()
	const { currentUser } = useAuthContext()
	const navigate = useNavigate()
	function handleSignOut() {
		try {
			logOut().then(() => {
				navigate(to = '/signin')
			})
		} catch {
			error => (
				console.error(error)
			)
		}
	}

	return (
		<nav className='navbar'>
			<div className="navbar__logo"><Link to='/' className='navbar__link'>Gamers Stop</Link></div>
			<Search />
			<ul className='navbar__list'>
				<li className="navbar__list-item">About</li>
				<li className="navbar__list-item">Contact</li>
				<li className="navbar__list-item">
					<NavLink to='/products' className='navbar__link'>Products</NavLink>
				</li>
				<li className="navbar__list-item">
					<Link to={currentUser ? '/account' : '/signin'} className='navbar__link navbar__dropdown'>
						<h5 className="navbar__account">Hello, <span className='navbar__username'>{currentUser?.displayName ?? 'sign in'}</span></h5>
						<BiChevronDown className='navbar__down-arrow' />
					</Link>
				</li>

				<li className="navbar__list-item">
					<Link className='navbar__link navbar__link--cart' to={'/cart'}><span className='navbar__cart-icon' data-cart-items={getTotalItems()}><AiOutlineShoppingCart /></span> Cart</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar