import './productCard.css'
import { Link, useParams } from 'react-router-dom'
import { createRouterPath, currencyFormatter } from '../../utils/utils'
import CartButtons from '../button/cartButtons/CartButtons'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'


function ProductCard({ product }) {
    const { id, images, name, price, brand, avgrating } = { ...product }
    return (
        <div className="product-card">
            <div className="product-card__image-container">
                <img className='product-card__img' src={images[0]} alt={name} />
            </div>
            <div className="product-card__content">
                <h4 className="product-card__name">
                    <Link className='product-card__link' to={`/${createRouterPath(name)}`} state={{ productId: id }}>{name}</Link>
                </h4>
                <div className="product-card__rating">
                    {
                        new Array(5).fill(0).map((a,i) => (
                            i < avgrating ? <AiFillStar key={i} className='star-icon'/> : <AiOutlineStar key={i} className='star-icon'/>
                        ))
                    }
                </div>
                <p className="product-card__brand-name">{brand}</p>
                <h5 className="product-card__price">{currencyFormatter(price)}</h5>
                <CartButtons id={id} product={product} />
            </div>
        </div>
    )
}

export default ProductCard