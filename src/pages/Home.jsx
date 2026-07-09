import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { useSearchParams } from "react-router-dom";
import { Music, Trophy, Briefcase } from 'lucide-react';
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const dummyEvents = [
    {
      id: 1,
      title: 'Future Tech Symposium 2025',
      organizer: 'Tech Innovators Club',
      date: '8/20/2025',
      location: 'coimbatore',
      category: 'professional',
      price: 0, // This will trigger the "Free Event" badge!
      attendees: 291,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60' 
    },
    {
      id: 2,
      title: 'Music Concert Series',
      organizer: 'Entertainment & Music Club',
      date: '9/5/2025',
      location: 'chennai',
      category: 'entertainment',
      price: 500, 
      attendees: 271,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      title: 'Sports Marathon 2025',
      organizer: 'Sports & Athletics Council',
      date: '10/15/2025',
      location: 'bangalore',
      category: 'sports',
      price: 200,
      attendees: 164,
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=60'
    }
  ];
  const categories = [
    { id: 'entertainment', name: 'Entertainment', icon: Music, colorStyle: 'text-purple-600 bg-purple-100' },
    { id: 'sports', name: 'Sports', icon: Trophy, colorStyle: 'text-orange-600 bg-orange-100' },
    { id: 'professional', name: 'Professional', icon: Briefcase, colorStyle: 'text-blue-600 bg-blue-100' }
  ];
  //sets and remove the category in url
  const handleCategoryClick = (categoryId) => {
    if (categoryId === activeCategory) {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId } ,{ replace: true });
    }
  };
  return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Explore Events */}
      <div className="mb-8 lg:mb-12">
        <h2 className="text-sm font-medium text-gray-500 mb-4">Explore Yours</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3  lg:gap-6">
          {categories.map((cat) => {
          const Icon = cat.icon;//since the varaible is capitalized, we can use it as a component
          const isActive = activeCategory === cat.id;  
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
               className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-4 transition-colors duration-300 w-full ${isActive ? 'border-indigo-600 bg-white shadow-md ring-1 ring-indigo-600' : 'border-gray-100 bg-white hover:bg-indigo-200 hover:shadow-sm'}`}
              >
                <div className={`w-14 h-14 rouded-full flex items-center justify-center ${cat.colorStyle} `}>
                  <Icon size={24} />
                </div>
                {/* texts */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                  {isActive? (
                    <span className="text-xs text-indigo-600 mt-1">ShowAll</span>
                  ):(
                    <span className="text-xs text-gray-500 mt-1">Click to filter</span>
                  )}
                  </div>
              </button>
          )})}
        </div>

      </div>
    
        {/* Section Header */}
        <div className="flex justify-between items-end mb-6 lg:mb-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">All Events</h2>
          <span className="text-sm text-gray-500 font-medium">{dummyEvents.filter((event) => activeCategory === 'all' || event.category === activeCategory).length} events found</span>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {dummyEvents.filter((event) => activeCategory === 'all' || event.category === activeCategory).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
  </div>
  );
};

export default Home;