import './search.css'
import {AiOutlineSearch} from 'react-icons/ai'

function Search() {
  return (
    <div className="search-box">
        <AiOutlineSearch />
        <input type="search" className='search-box__input' placeholder='Search'/>
    </div>
  )
}

export default Search