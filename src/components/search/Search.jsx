import './search.css'
import {AiOutlineSearch} from 'react-icons/ai'

function Search() {
  return (
    <div className="search">
        <AiOutlineSearch />
        <input type="search" className='search-box' placeholder='Search'/>
    </div>
  )
}

export default Search