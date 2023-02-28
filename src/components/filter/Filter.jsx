import FilterInputs from '../inputFields/filterInputs/FilterInputs'
import './filter.css'
import Accoridon from '../accordion/Accordion';
import { currencyFormatter } from '../../utils/utils';
import { useFilterSortContext } from '../../context/FilterSortContext';
import { AiOutlineClose } from 'react-icons/ai';


function getMinMaxPrice(products) {
    let filteredPrice = products.map(product => product.price)
    return Math.max(...filteredPrice)
}

function Filter({ handleOpenFilterSection }) {
    const { filterState: { outOfStock, brands, price, all_products }, updateFilterHelper } = useFilterSortContext()

    const maxPrice = getMinMaxPrice(all_products);

    const allUniqueBrands = [...new Set(all_products.map(product => product.brand))]

    function handlePriceChange(e) {
        updateFilterHelper('PRICE', e.target.value)
        // TODO: update price filtering 
        // updateFilterHelper('ADD_ACTIVE_FILTER', { type: 'PRICE', labelName: e.target.value })
    }

    return (
        <section className="filter-section">
            <button className="filter-section__close-btn" onClick={handleOpenFilterSection}><AiOutlineClose /></button>
            <div className="filter-section__price-section">
                <h4 className='filter-section__title'>Price</h4>
                <div className="filter-section__input-group">
                    <p className="filter-section__price">{currencyFormatter(price === 0 ? maxPrice : price)}</p>
                    <input type="range" name="price" value={price === 0 ? maxPrice : price}
                        max={maxPrice}
                        min={0}
                        step={10000}
                        onChange={(e) => handlePriceChange(e)} />
                </div>
            </div>
            <Accoridon title={'Brands'}>
                {allUniqueBrands.map((brand, i) => (
                    <FilterInputs key={i} name={brand} labelName={brand} type={'BRANDS'}
                        payload={brand} isChecked={brands.indexOf(brand) !== -1} />
                ))}
            </Accoridon>
            <Accoridon title={'Customer Review'}>
                {
                    new Array(4).fill(0).map((_, i) => (
                        <FilterInputs key={i} name={'rating'} inputType={'radio'} labelName={4 - i}
                            icon={true} type={'RATING'} payload={4 - i} />
                    ))
                }
            </Accoridon>
            <Accoridon title={'Discount'}>
                <FilterInputs name={'10per'} labelName={'10% Off or +'} />
                <FilterInputs name={'20per'} labelName={'20% Off or +'} />
                <FilterInputs name={'30per'} labelName={'30% Off or +'} />
                <FilterInputs name={'40per'} labelName={'40% Off or +'} />
                <FilterInputs name={'50per'} labelName={'50% Off or +'} />
            </Accoridon>
            <Accoridon title={'Item Condition'}>
                {
                    ['New', 'Renewed', 'Used'].map((con, i) => (
                        <FilterInputs key={i} inputType='radio' name={'itemCondition'}
                            labelName={con} type={'ITEM_CONDITION'} payload={con.toLowerCase()} />
                    ))
                }
            </Accoridon>
            <Accoridon title={'New Arraivals'}>
                <FilterInputs name={'last30days'} labelName={'Last 30 Days'} />
                <FilterInputs name={'last90days'} labelName={'Last 90 Days'} />
            </Accoridon>
            <Accoridon title={'Availability'}>
                <FilterInputs name={'outOfStock'} type={'OUT_OF_STOCK'} payload={outOfStock}
                    isChecked={outOfStock} labelName={'Include Out Of Stock'} />
            </Accoridon>
        </section>
    )
}

export default Filter