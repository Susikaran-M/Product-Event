import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiSearch ,FiChevronDown ,FiFilter } from 'react-icons/fi';

const Navbar = () => {

    const { isAuthenticated, role } = useAuth();

    return(
    
    <nav className="flex flex-col lg:flex-row lg:justify-around items-center px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm gap-4">
      {/* top mobile desktop left */}
      <div className="flex justify-between items-center w-full lg:w-auto">
        {/* Left logo */}
        <Link to="/" className="text-xl font-bold text-indigo-700 tracking-wide">
        View Your Event
      </Link>
      {/* only visible on mobile */}
      <div className="lg:hidden items-center gap-4">
        {isAuthenticated ? (
             <button className="text-sm font-medium text-gray-700">Profile</button>
          ) : (
            <Link to="/login" className="text-sm font-medium text-blue-600">Sign In</Link>
          )}
          </div>
      </div>
      {/* for mobile second row and for desktop single row */}
      <div className="flex  flex-col lg:flex-row w-full lg:flex-1 lg:justify-center items-center gap-3 lg:gap-4 lg:px-6 hide-scrollbar">

      
          <div className="flex items-center gap-2 w-full mg:w-auto">
        {/* location */}
          <button className=" flex-1 md:flex-none flex justify-center items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
          Select Location <FiChevronDown />
        </button>
        
        {/* filter */}
        <button className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-gray-50 border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
          <FiFilter /> Filters
        </button>
          </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 w-full lg:w-80 xl:w-[400px]">
      <FiSearch className="text-gray-400 mr-2 shrink-0" />
      <input 
          type="text" 
          placeholder="Event name or organization..." 
          className="bg-transparent outline-none w-full text-sm text-gray-700"
        />
      </div>


      </div>

      
      {/* the dynamic organize,profile and sign in button */}
      <div className="hidden lg:flex items-center gap-6">
         {/* the dynamic organize button */}
        {isAuthenticated && role === 'ORGANIZER' && (
          <Link to="/create-event" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Organize
          </Link>
        )}
        {/* the dynamic profile,sign in button */}
        {isAuthenticated ? (
           <button className="flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2 hover:bg-gray-50 transition-all">
             <span className="text-sm font-medium text-gray-700">Profile</span>
           </button>
        ) : (
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">
            Sign In
          </Link>
        )}
      </div>
    </nav>
    )

}
export default Navbar