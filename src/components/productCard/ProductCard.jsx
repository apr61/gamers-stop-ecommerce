import './productCard.css'
import {FaRupeeSign} from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { createRouterPath } from '../../utils/PathNameFormatter'

function ProductCard({product}) {
    const {category} = useParams()
    const {id,images, name, price, brand } = {...product}
    function currencyFormatter(number){
        return new Intl.NumberFormat(undefined).format(number)
    }
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={images[0]} alt={name} />
            </div>
            <div className="product-content">
                <h4 className="product-name">
                    <Link to={`/${category}/pr/${createRouterPath(name.toLowerCase())}`} state={{productId: id}}>{name}</Link>
                </h4>
                <p className="brand-name">{brand}</p>
                <h5 className="product-price"><FaRupeeSign className='rupee-sign' />{currencyFormatter(price)}</h5>
            </div>
        </div>
    )
}

export default ProductCard