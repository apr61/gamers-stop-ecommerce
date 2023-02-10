import { currencyFormatter } from '../../utils/utils'
import CartButtons from '../button/cartButtons/CartButtons'
import QuantityCounter from '../quantityCounter/QuantityCounter'
import './cartItem.css'

function CartItem({product}) {
    return (
        <li className="cart-item">
            <div className="cart-item__image-container">
                <img className='cart-item__img' src={product.images[0]} alt={product.name} />
            </div>
            <div className="cart-item__body">
                <h3 className="cart-item__product-name">{product.name}</h3>
                <p className="cart-item__total-amount">{currencyFormatter(product.price)}</p>
                <QuantityCounter product={product} />
            </div>
            <div className="cart-item__btn-grp">
                <CartButtons product={product} id={product.id} />
            </div>
        </li>
    )
}

export default CartItem