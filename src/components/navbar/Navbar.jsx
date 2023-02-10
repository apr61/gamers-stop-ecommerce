import './navbar.css'
import Search from '../search/Search'
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCartState } from '../../context/CartContext'
import { useAuthContext } from '../../context/AuthContext'
import { logOut } from '../../services/auth'
import { BiChevronDown, BiMenu } from 'react-icons/bi'
import { useState } from 'react'

function Navbar() {
	const { getTotalItems } = useCartState()
	const { currentUser } = useAuthContext()
	const [dropDownStatus, setDropDownStatus] = useState(false)
	const [openMenu, setOpenMenu] = useState(false)
	const navigate = useNavigate()
	function handleSignOut() {
		try {
			logOut().then(navigate(to = '/signin'))
		} catch {
			error => (
				console.error(error)
			)
		}
	}
	console.log(openMenu)

	return (
		<nav className='navbar'>
			<Link to='/' className='navbar__link navbar__link--logo'>Gamers Stop</Link>
			<Search />
			<ul className={openMenu ? 'navbar__list open' : 'navbar__list'}>
				<li className="navbar__list-item">About</li>
				<li className="navbar__list-item">Contact</li>
				<li className="navbar__list-item">
					<NavLink to='/products' className='navbar__link'>Products</NavLink>
				</li>
				<li className="navbar__list-item">
					<div className="dropdown" onMouseOver={() => setDropDownStatus(true)} onMouseLeave={() => setDropDownStatus(false)}>
						<Link to={currentUser ? '/account' : '/signin'} className='navbar__link navbar__account'>
							<h5 className="navbar__account">Hello, <span className='navbar__username'>{currentUser?.displayName ?? 'sign in'}</span></h5>
							<BiChevronDown className='navbar__down-arrow' />
						</Link>
						<div className={dropDownStatus ? "dropdown-content show-dropdown" : "dropdown-content"}>
							{
								currentUser ? (
									<>
										<Link to='/account' className='navbar__link navbar__link--drop'>Account</Link>
										<button className="navbar__btn" onClick={handleSignOut}>Log out</button>
									</>
								) : (
									<>
										<Link to='/signin' className='navbar__link navbar__link--drop'>Sign In</Link>
										<Link to='/signup' className='navbar__link navbar__link--drop'>Sign Up</Link>
									</>
								)
							}
						</div>
					</div>
				</li>
				<button className="navbar__btn navbar__btn--menu-close" onClick={() => setOpenMenu(!openMenu)}><AiOutlineClose /></button>
				<li className="navbar__list-item">
					<Link className='navbar__link navbar__link--cart' to={'/cart'}><span className='navbar__cart-icon' data-cart-items={getTotalItems()}><AiOutlineShoppingCart /></span> Cart</Link>
				</li>
			</ul>
			<button className="navbar__btn navbar__btn--menu" onClick={() => setOpenMenu(!openMenu)}><BiMenu /></button>
		</nav>
	)
}

export default Navbar