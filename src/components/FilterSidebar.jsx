import {createPortal} from 'react-dom'
import { useState ,useEffect } from 'react';
import { FiX } from 'react-icons/fi';
const FilterSidebar = ({ isOpen, onClose }) => {
    const [Filter, setFilter] = useState({
        category: [],
         date: '',
        time: '',
         price: [],
    });

    //handle toggle for category and price checkboxes
    const handleToggle = (type, value) => {
      setFilter((prev) => {
        const currentValues = prev[type];
        if (currentValues.includes(value)) {
          return { ...prev, [type]: currentValues.filter((v) => v !== value) };
        } else {
          return { ...prev, [type]: [...currentValues, value] };
        }
      });
    };
    // handle clear all filters
    const handleClearAll = () => {
      setFilter({
        category: [],
        date: '',
        time: '',
        price: [],
      });
    };

    //handle apply filters
    const handleApplyFilters = () => {
      console.log("filters will be send to the backend");
      onClose();
    };

    const sidebar = (
        <>
        {/* the background overlay */}
        {isOpen && (
            <div className="fixed inset-0 bg-black/40 z-[65] transition-opacity" onClick={onClose}
            ></div>  
        )
        }
        {/* the slide drawer */}
        {/* //common styles for both mobile and desktop 
         Mobile: bottom sheet | Desktop: right sidebar
        // Animation: slides up on mobile, slides right on desktop */}
        <div className={`fixed bg-white z-[70] transition-transform duration-300 flex flex-col shadow-2xl
         bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl
        lg:top-0 lg:bottom-0 lg:right-0 lg:left-auto lg:h-full lg:w-[400px] lg:rounded-none
        ${isOpen ? 'translate-y-0 lg:translate-x-0' : 'translate-y-full lg:translate-y-0 lg:translate-x-full'}
        `}>

        {/* the header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <FiX size={20} />
          </button>
        </div>
        {/* the scrollable content area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
            {/* Category Section */}
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Category</h3>
                
                <div className="space-y-3">
                {['Professional', 'Sports', 'Entertainment'].map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" 
            checked={Filter.category.includes(cat)}
            onChange={() => handleToggle('category', cat)}

            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                  <span className="text-sm text-gray-600">{cat}</span>
                </label>
                ))}

                </div>
            </div>
            {/* Date Section */}
            <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Date</h3>
            <input 
              type="date" 
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-indigo-600" 
            />
          </div>
            {/* Time Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Time</h3>
            <input 
              type="time" 
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-indigo-600" 
            />
          </div>
            {/* price Section */}
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Price</h3>
                <div className="space-y-3">
                {['Free-199', '₹200-499', '₹500-999', '₹1000-1999', '₹2000-4999', '₹5000-9999', '₹10000+'].map((price) => (
                <label key={price} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox"
                  checked={Filter.price.includes(price)}
                  onChange={() => handleToggle('price', price)}

                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  
                  />
                  <span className="text-sm text-gray-600">{price}</span>
                </label>
              ))}
            </div>
            </div>
        </div>
        {/* the footer */}
        <div className="p-6 border-t border-gray-300 flex gap-4 bg-white lg:mb-0 mb-4">

            <button 
            onClick={handleClearAll}
            className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button 
            onClick={handleApplyFilters}
            className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Apply Filters
          </button>
        </div>
      
        </div>
    
        </>
    )
    return createPortal(sidebar, document.getElementById('modal-root'))
}
export default FilterSidebar