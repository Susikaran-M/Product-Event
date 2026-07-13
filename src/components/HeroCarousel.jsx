import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
const HeroCarousel = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Sports Marathon 2025",
      organizer: "Sports & Athletics Council",
      description:
        "Join thousands in this annual marathon supporting health and fitness awareness.",
      date: "10/15/2025",
      location: "bangalore",
      attendees: 164,
      category: "sports",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Global Tech Summit",
      organizer: "Tech Innovators",
      description:
        "The largest gathering of software engineers and tech visionaries in the country.",
      date: "11/20/2025",
      location: "chennai",
      attendees: 506,
      category: "professional",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Symphony Under the Stars",
      organizer: "Orchestra Guild",
      description:
        "An unforgettable evening of classical music performed by world-renowned artists.",
      date: "12/05/2025",
      location: "coimbatore",
      attendees: 890,
      category: "entertainment",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&auto=format&fit=crop&q=80",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? featuredEvents.length - 1 : currentIndex - 1,
    );
  };
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === featuredEvents.length - 1 ? 0 : prev + 1,
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div className="mb-12 lg:mb-16">
      <h2 className="text-sm font-medium text-gray-500 mb-4">
        Most Registered Events
      </h2>
      {/* Carousel container */}
      <div className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden group">
        {/* slides */}
        {featuredEvents.map((event, index) => (
          <div
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            {/* background image */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {/* dark overlay for text readability */}
            {/* bottom to top */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            {/* left to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
            {/* content container */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-12 text-white">
              <span className="inline-block bg-blue-600 text-xs font-medium px-3 py-1.5 rounded-full mb-3 md:mb-4 capitalize">
                {event.category}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl  mb-2 md:mb-3 line-clamp-1">
                {event.title}
              </h2>
              <h3
                className="text-sm md:text-lg lg:text-xl text-gray-300
                                px-3 py-1 rounded-full mb-2 md:mb-3 line-clamp-1 capitalize"
              >
                {event.organizer}
              </h3>
              {/* description is not shown on mobile and shown on tablet and desktop  */}
              <p
                className="text-sm md:text-base text-gray-300 mb-5
                max-w-2xl line-clamp-2 hidden md:block"
              >
                {event.description}
              </p>
              {/* Event Meta Data */}
              <div className="flex flex-wrap items-center gap-3 md:gap-5 text-xs md:text-sm text-gray-200 mb-4 md:mb-0">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} /> {event.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} /> {event.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={16} /> {event.attendees} attendees
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* navigation buttons show on desktop ,but not on mobile */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-blcak/60 text-white backdrop-blur-sm items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-blcak/60 text-white backdrop-blur-sm items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
        >
          <ChevronRight size={20} />
        </button>
        {/* Pagination Dots (Always visible at the bottom) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {featuredEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={` h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/80"}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HeroCarousel;
