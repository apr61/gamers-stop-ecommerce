import './productCard.css'
import {FaRupeeSign} from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { createRouterPath,currencyFormatter } from '../../utils/utils'

function ProductCard({product, categoryHome}) {
    const {category} = useParams()
    const {id,images, name, price, brand } = {...product}
    
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={images[0]} alt={name} />
            </div>
            <div className="product-content">
                <h4 className="product-name">
                    <Link to={`/${category? category : createRouterPath(categoryHome)}/pr/${createRouterPath(name)}`} state={{productId: id}}>{name}</Link>
                </h4>
                <p className="brand-name">{brand}</p>
                <h5 className="product-price"><FaRupeeSign className='rupee-sign' />{currencyFormatter(price)}</h5>
            </div>
        </div>
    )
}

export default ProductCard