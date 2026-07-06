import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiSearch ,FiChevronDown ,FiFilter } from 'react-icons/fi';
import {useState ,useEffect ,useRef} from 'react'
import FilterSidebar from './FilterSidebar';
const Navbar = () => {

    const[isFilterOpen,setIsFilterOpen] = useState(false);
    const { isAuthenticated, role } = useAuth();
    // Location Dropdown State
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Select Location');

  const locationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      //here the locationRef.current is used to check if the dropdown is on
      //the screen to avoid the crash of the app when the dropdown is not on 
      // the screen and user clicks outside the dropdown

      //if dropdown is open and click is outside the dropdown, close it
      if (isLocationOpen && locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isLocationOpen]);

    return(
    
    <nav className="flex flex-col lg:flex-row lg:justify-around items-center px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm gap-4">
      {/* top mobile desktop left */}
      <div className="flex justify-between items-center w-full lg:w-auto">
        {/* Left logo */}
        <Link to="/" className="text-xl font-bold text-indigo-700 tracking-wide">
        View Your Event
      </Link>
      {/* only visible on mobile */}
      <div className="lg:hidden flex items-center gap-4">
          {/* the dynamic organize button */}
        {isAuthenticated && role === 'ORGANIZER' && (
          <Link to="/create-event" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Organize
          </Link>
        )}
        {isAuthenticated ? (
             <button className="text-sm font-medium text-gray-700">Profile</button>
          ) : (
            <Link to="/login" className="text-sm font-medium text-blue-600">Sign In</Link>
          )}
          </div>
      </div>
      {/* for mobile second row and for desktop single row */}
      <div className="flex  flex-col lg:flex-row w-full lg:flex-1 items-center gap-3 lg:gap-4 lg:px-6 hide-scrollbar">

      
          <div className="flex items-center gap-2 w-full">
        {/* location */}
        <div ref={locationRef} className="relative w-full lg:w-auto">
          <button
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className=" w-full flex-1 lg:flex-none flex justify-center items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            {/* Display the selected state, and animate the arrow! */}
            <span className="truncate max-w-[120px]">{selectedLocation}</span>
          <FiChevronDown className={`transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} />
        </button>

        {isLocationOpen && (
          <div className="absolute top-full left-0 mt-2 w-full lg:w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-[80]">
          <div className="max-h-60 overflow-y-auto hide-scrollbar">
                {['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Delhi', 'Telangana', 'Kerala', 'Gujarat', 'West Bengal'].map((state) => (
                  <button
                    key={state}
                    onClick={() => {
                      setSelectedLocation(state);
                      setIsLocationOpen(false); // Close after picking
                    }}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    {state}
                  </button>
        ))}
          </div>
        </div>
        )}
        </div>
        
        {/* filter */}
        <button
        onClick={() => setIsFilterOpen(true)}
        className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-gray-50 border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
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
           <button className="flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2 hover:bg-gray-100 transition-all">
             <span className="text-sm font-medium text-gray-700">Profile</span>
           </button>
        ) : (
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">
            Sign In
          </Link>
        )}
      </div>
      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />
    </nav>
    
    )

}
export default Navbar