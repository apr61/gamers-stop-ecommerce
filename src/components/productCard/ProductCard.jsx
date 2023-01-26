import './productCard.css'

function ProductCard({product}) {
    const {images, name, price, brand } = {...product}
    function currencyFormatter(number){
        return new Intl.NumberFormat(undefined).format(number)
    }
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={images[0]} alt={name} />
            </div>
            <div className="product-content">
                <h4 className="product-name">{name}</h4>
                <p className="brand-name">{brand}</p>
                <h5 className="product-price"> {currencyFormatter(price)}</h5>
            </div>
        </div>
    )
}

export default ProductCard