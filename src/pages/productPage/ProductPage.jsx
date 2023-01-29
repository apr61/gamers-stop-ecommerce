import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import './productPage.css'
import { useLocation } from 'react-router-dom'
import { FaBalanceScale, FaRupeeSign } from 'react-icons/fa'
import ProductImages from '../../components/productImages/ProductImages'
import { currencyFormatter } from '../../utils/utils'
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { FiShoppingBag } from 'react-icons/fi'


//data
import { products } from '../../data/productsData'
import { useState } from 'react'

function ProductPage() {
	const [quantity, setQuantity] = useState(1)
	// getting state
	const location = useLocation()
	const productId = location.state?.productId
	// filtering products based on product id
	const filteredProduct = products.filter(product => product.id === productId)[0]
	const { name, images, brand, memory, price, description, manufacturer } = { ...filteredProduct }
	return (
		<>
			<Navbar />
			<div className="main product-page">
				<div className="product-page-image-container">
					<ProductImages images={images} name={name} />
				</div>
				<div className="product-page-content">
					<h3 className='product-name'>{name}</h3>
					<p className='product-price'>{<><FaRupeeSign className='rupee-sign' />{currencyFormatter(price)}</>}</p>
					<p className="product-desc">
						{description}
					</p>
					<div className="counter">
						<button onClick={() => {setQuantity(quantity > 0 ? quantity - 1 : 0)}}>-</button>
						<span>{quantity}</span>
						<button onClick={() => {setQuantity(quantity + 1)}}>+</button>
					</div>
					<div className="buttons-section">
						<div className="btn-wrapper">
						<button className="add-to-cart"><><AiOutlineShoppingCart /></> Add To Cart</button>
						<button className="buy-now"><><FiShoppingBag /></> Buy Now</button>
						</div>
						<div className="btn-wrapper">
							<button><AiOutlineHeart />Add To Wish List</button>
							<button><FaBalanceScale />Add To Compare</button>
						</div>
					</div>
					<div className="offers">
						<h4>Offers</h4>
						<ul>
							<li>Offer 1</li>
							<li>Offer 2</li>
							<li>Offer 3</li>
							<li>Offer 4</li>
						</ul>
					</div>
					<div className="available-services">
						<h4>Services Available</h4>
						<ul>
							<li>Free Delivery</li>
							<li>14 Days replacement</li>
							<li>Gamers Stop Delivered</li>
							<li>1 Year Warrenty</li>
						</ul>
					</div>
					<div className="info">
						<h4>About Item</h4>
						<table>
							<tbody>
								<tr>
									<th>Manufacuturer</th>
									<td>{manufacturer}</td>
								</tr>
								<tr>
									<th>Brand</th>
									<td>{brand}</td>
								</tr>
								<tr>
									<th>Memory</th>
									<td>{memory}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="seller-info">
						<h4>Seller Info</h4>
						<p className="seller-name">kharidiye dot com </p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default ProductPage