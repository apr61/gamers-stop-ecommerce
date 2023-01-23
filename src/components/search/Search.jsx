import './search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Search() {
  return (
    <div className="search">
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        <input type="search" className='search-box' placeholder='Search'/>
    </div>
  )
}

export default Search