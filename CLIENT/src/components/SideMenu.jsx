
import { Link, useSearchParams } from 'react-router-dom';
import Search from "./Search"

 
const SideMenu = () => {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const handleFilterChange = (e)=>{
    if (searchParams.het("sort")!== e.target.value){
      setSearchParams({
       ...Object.fromEntries(searchParams.entries()), 
       sort: e.target.value ,
    })
    }
  }
  return (
    <div className="px-4 h-max stick top-8">
       <h1 className="mb-4 text-lm font-medium">Search</h1>
       {/* Search Input */}
        <Search/>

       <h1 className="mt-8 mb-4 text-sm font-medium">Filters</h1>
       <div className=' flex flex-col gap-2 text-sm'>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
            <input type="radio" name="sort" onChange={handleFilterChange} value="newest" className='appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 ' />
            Newest
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
            <input type="radio" name="sort" onChange={handleFilterChange} value="Popular" className='appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 ' />
            Popular
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
            <input type="radio" name="sort" onChange={handleFilterChange} value="Trending" className='appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 ' />
            Trending
        </label>
        
        
       </div>

       <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
       <div className='flex flex-col gap-2 text-sm'>
            <Link className='underline ' to="/posts">All</Link>
            <Link className='underline' to="/posts?cat=web-development">Web -Development</Link>
            <Link className='underline' to="/posts?cat=development">Development</Link>
            <Link className='underline' to="/posts?ai">AI</Link>
            <Link className='underline' to="/posts?cat=fashiont">Fashion</Link>
            <Link className='underline' to="/posts?cat=markeing">Marketing</Link>

       </div>
    </div>
  )
}

export default SideMenu
