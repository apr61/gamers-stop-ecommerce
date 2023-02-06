import './navbar.css'
import UserProfile from '../../assets/images/UserProfile.png'
import Search from '../search/Search'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCartState } from '../../context/CartContext'
import { useAuthContext } from '../../context/AuthContext'

function Navbar() {
	const { getTotalItems } = useCartState()
	const { logOut, currentUser } = useAuthContext()
	const navigate = useNavigate()
	async function handleSignOut() {
		try {
			await logOut()
			navigate(to = '/signin')
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
				{
					!currentUser && (
						<>
							<li className="navbar__list-item">
								<NavLink to='/signin' className='navbar__link'>Sign In</NavLink>
							</li>
							<li className="navbar__list-item">
								<NavLink to='/signup' className='navbar__link'>Sign Up</NavLink>
							</li>
						</>
					)
				}
				<li className="navbar__list-item">
					<Link className='navbar__link navbar__link--cart' to={'/cart'}><span className='navbar__cart-icon' data-cart-items={getTotalItems()}><AiOutlineShoppingCart /></span> Cart</Link>
				</li>
				{
					currentUser && (
						<li className="navbar__list-item">
							<button className='navbar__btn' onClick={handleSignOut}>Sign Out</button>
						</li>
					)
				}
			</ul>
		</nav>
	)
}

export default Navbar