import InputCheckBox from '../inputCheckBox/InputCheckBox'
import './filter.css'
import { FaRupeeSign } from 'react-icons/fa';

import { currencyFormatter } from '../../utils/utils';
import { useState } from 'react';
import Accoridon from '../accordion/Accordion';

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
            <Accoridon title={'Brands'}>
                {[...new Set(products.map(product => product.brand))].map((brand, i) => (
                    <InputCheckBox key={i} name={brand} labelName={brand} />
                ))}
            </Accoridon>
            <Accoridon title={'Customer Review'}>
                <InputCheckBox name={'4above'} labelName={'4'} icon={true} />
                <InputCheckBox name={'3above'} labelName={'3'} icon={true} />
                <InputCheckBox name={'2above'} labelName={'2'} icon={true} />
                <InputCheckBox name={'1above'} labelName={'1'} icon={true} />
            </Accoridon>
            <Accoridon title={'Discount'}>
                <InputCheckBox name={'10per'} labelName={'10% Off or +'} />
                <InputCheckBox name={'20per'} labelName={'20% Off or +'} />
                <InputCheckBox name={'30per'} labelName={'30% Off or +'} />
                <InputCheckBox name={'40per'} labelName={'40% Off or +'} />
                <InputCheckBox name={'50per'} labelName={'50% Off or +'} />
            </Accoridon>
            <Accoridon title={'Item Condition'}>
                <InputCheckBox name={'new'} labelName={'New'} />
                <InputCheckBox name={'renewed'} labelName={'Renewed'} />
                <InputCheckBox name={'used'} labelName={'Used'} />
            </Accoridon>
            <Accoridon title={'New Arraivals'}>
                <InputCheckBox name={'last30days'} labelName={'Last 30 Days'} />
                <InputCheckBox name={'last90days'} labelName={'Last 90 Days'} />
            </Accoridon>
            <Accoridon title={'Availability'}>
                <InputCheckBox name={'Include-Out-Of-Stock'} labelName={'Include Out Of Stock'} />
            </Accoridon>
        </section>
    )
}

export default Filter