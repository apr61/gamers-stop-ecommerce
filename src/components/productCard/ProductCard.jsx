import './productCard.css'
import { FaRupeeSign } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { createRouterPath, currencyFormatter } from '../../utils/utils'
import CartButtons from '../button/cartButtons/CartButtons'


function ProductCard({ product, categoryHome }) {
    const { category } = useParams()
    const { id, images, name, price, brand } = { ...product }
    return (
        <div className="product-card">
            <div className="product-card__image-container">
                <img className='product-card__img' src={images[0]} alt={name} />
            </div>
            <div className="product-card__content">
                <h4 className="product-card__name">
                    <Link className='product-card__link' to={`/${category ? category : createRouterPath(categoryHome)}/pr/${createRouterPath(name)}`} state={{ productId: id }}>{name}</Link>
                </h4>
                <p className="product-card__brand-name">{brand}</p>
                <h5 className="product-card__price"><FaRupeeSign className='rupee-sign' />{currencyFormatter(price)}</h5>
                <CartButtons id={id} product={product} />
            </div>
        </div>
    )
}

export default ProductCard