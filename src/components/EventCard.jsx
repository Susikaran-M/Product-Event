import { FiUsers ,FiCalendar ,FiMapPin} from "react-icons/fi";
const EventCard = ({ event }) => {
    const isFree = event.price === 0;
    return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
        {/* event image header */}
        <div className="relative h-52 w-full bg-gray-100 shrink-0">
        {/* event image */}
        <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
        >
        </img>
        {/* free badge */}
        {isFree && (
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                Free
            </div>
        )}
        {/* registered badge */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5">
           <FiUsers size={14}/> {event.attendees} Registered
        </div>
        </div>
        {/* card body */}
        <div className="p-5 flex flex-col flex-1">
            {/* event title */}
           
                <h3 className="text-[17px] font-semibold text-gray-900 mb-1 line-clamp-2" >
                    {event.title}
                </h3>
            {/* event organizer */}
            <p className="text-sm text-gray-500 mb-3 line-clamp-1">
            by {event.organizer}
            </p>
            {/* event date and location */}
            <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3 text-gray-500 text-sm">
                <FiCalendar className="text-gray-400 shrink-0" size={16} />
                <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-sm">
                <FiMapPin className="text-gray-400 shrink-0" size={16} />
                <span className="capitalize">{event.location}</span>
            </div>
            {/* Category  (Pushes button to bottom) */}
            <div className="mt-auto mb-5">
                <span className="inline-blockborder border-gray-200 text-gray-600 text-xs font-medium  px-3 py-1.5 rounded-full capitalize">
                    {event.category}    
                </span>
            </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-xl transition-colors shadow-sm">
        {isFree ? 'Register Free' : 'View Event'}
        </button>
        </div>
    </div>
    )
}

export default EventCard