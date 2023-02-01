import InputBox from '../InputCheckBox/InputBox'
import './filter.css'
import { FaRupeeSign } from 'react-icons/fa';
import { useState } from 'react';
import Accoridon from '../accordion/Accordion';
import { currencyFormatter } from '../../utils/utils';
import { useFilterContext } from '../../context/FilterContext';


function Filter({ products, filterProducts }) {
    const sortedProductsPrice = getMinMaxPrice(filterProducts);
    const [filteredPrice, setFilteredPrice] = useState(sortedProductsPrice[0])

    function getMinMaxPrice(products) {
        return products.map(product => product.price).sort((a, b) => a - b)
    }

    const { filterState:{outOfStock, brands} } = useFilterContext()

    return (
        <section className="filter-section">
            <div className="filter-section__price-section">
                <h4 className='filter-section__title'>Price</h4>
                <div className="filter-section__input-group">
                    <input type="range" name="price" value={filteredPrice}
                        max={sortedProductsPrice[sortedProductsPrice.length - 1]}
                        min={sortedProductsPrice[0]}
                        onChange={(e) => { setFilteredPrice(e.target.value) }} />
                </div>
                <div className="filter-section__price-sec">
                    <p className="filter-section__price">Min - <><FaRupeeSign className='rupee-sign' /></>{currencyFormatter(sortedProductsPrice[0])}</p>
                    <p className="filter-section__price">Max - <><FaRupeeSign className='rupee-sign' /></>{currencyFormatter(sortedProductsPrice[sortedProductsPrice.length - 1])}</p>
                    <p className="filter-section__price">Filtered Price - <><FaRupeeSign className='rupee-sign' /></>{currencyFormatter(filteredPrice)}</p>
                </div>
            </div>
            <Accoridon title={'Brands'}>
                {[...new Set(products.map(product => product.brand))].map((brand, i) => (
                    <InputBox key={i} name={brand} labelName={brand} type={'BRANDS'}
                        payload={brand} checked={brands.indexOf(brand) !== -1} />
                ))}
            </Accoridon>
            <Accoridon title={'Customer Review'}>
                {
                    new Array(4).fill(0).map((_, i) => (
                        <InputBox key={i} name={'rating'} inputType={'radio'} labelName={4 - i}
                            icon={true} type={'RATING'} payload={4 - i} />
                    ))
                }
            </Accoridon>
            <Accoridon title={'Discount'}>
                <InputBox name={'10per'} labelName={'10% Off or +'} />
                <InputBox name={'20per'} labelName={'20% Off or +'} />
                <InputBox name={'30per'} labelName={'30% Off or +'} />
                <InputBox name={'40per'} labelName={'40% Off or +'} />
                <InputBox name={'50per'} labelName={'50% Off or +'} />
            </Accoridon>
            <Accoridon title={'Item Condition'}>
                {
                    ['New', 'Renewed', 'Used'].map((con, i) => (
                        <InputBox key={i} inputType='radio' name={'item-condition'}
                            labelName={con} type={'ITEM_CONDITION'} payload={con.toLowerCase()} />
                    ))
                }
            </Accoridon>
            <Accoridon title={'New Arraivals'}>
                <InputBox name={'last30days'} labelName={'Last 30 Days'} />
                <InputBox name={'last90days'} labelName={'Last 90 Days'} />
            </Accoridon>
            <Accoridon title={'Availability'}>
                <InputBox name={'outOfStock'} type={'OUT_OF_STOCK'} payload={outOfStock}
                    isChecked={outOfStock} labelName={'Include Out Of Stock'} />
            </Accoridon>
        </section>
    )
}

export default Filter