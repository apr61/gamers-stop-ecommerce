import InputCheckBox from '../inputCheckBox/InputCheckBox'
import './filter.css'
import { FaRupeeSign } from 'react-icons/fa';

import { currencyFormatter } from '../../utils/utils';
import { useState } from 'react';

function Filter({ products }) {
    const sortedProductsPrice = getMinMaxPrice(products);
    const [filteredPrice, setFilteredPrice] = useState(sortedProductsPrice[0])

    function getMinMaxPrice(products) {
        return products.map(product => product.price).sort((a, b) => a - b)
    }
    return (
        <section className="filter-section">
            <div className="price-section">
                <h4>Price</h4>
                <div className="input-group">
                    <input type="range" name="price" value={filteredPrice}
                        max={sortedProductsPrice[sortedProductsPrice.length - 1]}
                        min={sortedProductsPrice[0]}
                        onChange={(e) => { setFilteredPrice(e.target.value) }} />
                </div>
                <div className="price-sec">
                    <p className="price">Min - <><FaRupeeSign className='rupee-sign' /></>{currencyFormatter(sortedProductsPrice[0])}</p>
                    <p className="price">Max - <><FaRupeeSign className='rupee-sign' /></>{currencyFormatter(sortedProductsPrice[sortedProductsPrice.length - 1])}</p>
                    <p className="price">Filtered Price - <><FaRupeeSign className='rupee-sign' /></>{currencyFormatter(filteredPrice)}</p>
                </div>
            </div>
            <div className="brands-section">
                <h4>Brands</h4>
                {[...new Set(products.map(product => product.brand))].map((brand, i) => (
                    <InputCheckBox key={i} name={brand} labelName={brand} />
                ))}
            </div>
            <div className="customer-review-section">
                <h4>Customer Review</h4>
                <InputCheckBox name={'4above'} labelName={'4'} icon={true} />
                <InputCheckBox name={'3above'} labelName={'3'} icon={true} />
                <InputCheckBox name={'2above'} labelName={'2'} icon={true} />
                <InputCheckBox name={'1above'} labelName={'1'} icon={true} />
            </div>
            <div className="discount-section">
                <h4>Discount</h4>
                <InputCheckBox name={'10per'} labelName={'10% Off or +'} />
                <InputCheckBox name={'20per'} labelName={'20% Off or +'} />
                <InputCheckBox name={'30per'} labelName={'30% Off or +'} />
                <InputCheckBox name={'40per'} labelName={'40% Off or +'} />
                <InputCheckBox name={'50per'} labelName={'50% Off or +'} />
            </div>
            <div className="item-condition-section">
                <h4>Item Condition</h4>
                <InputCheckBox name={'new'} labelName={'New'} />
                <InputCheckBox name={'renewed'} labelName={'Renewed'} />
                <InputCheckBox name={'used'} labelName={'Used'} />
            </div>
            <div className="arrivals-section">
                <h4>New Arraivals</h4>
                <InputCheckBox name={'last30days'} labelName={'Last 30 Days'} />
                <InputCheckBox name={'last90days'} labelName={'Last 90 Days'} />
            </div>
            <div className="availability-section">
                <h4>Availability</h4>
                <InputCheckBox name={'Include-Out-Of-Stock'} labelName={'Include Out Of Stock'} />
            </div>
        </section>
    )
}

export default Filter