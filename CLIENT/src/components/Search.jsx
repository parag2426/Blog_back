
import { FiSearch } from 'react-icons/fi';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()


  const handleKeyPress =(e)=>{
    if(e.key ==="Enter"){
      const query = e.target.value ;
      if (location.pathname=== "/posts"){
        setSearchParams({...Object.fromEntries(searchParams) , search:query})
      }else {
        navigate(`/posts?search=${query}`) ;
      }
    }
  }



  return (
    
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
              <FiSearch className="text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Search a post..."
                className="bg-transparent outline-none text-gray-700 placeholder:text-gray-400 w-40 sm:w-60"
                onKeyDown={handleKeyPress}
              />
            </div>

  )
}

export default Search
