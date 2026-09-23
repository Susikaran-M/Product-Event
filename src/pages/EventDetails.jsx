import {Share2} from 'lucide-react';
const eventData = {
  id: "EVT-001",
  title: "Tech Summit 2025",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  about: "Join us for the biggest tech conference of the year. Network with industry leaders, attend workshops, and explore the latest innovations in technology.",
  date: "January 15, 2025",
  time: "09:00 AM",
  location: "Convention Center, Bandra",
  duration: "2 days",
  organizer: {
    name: "Innovation Hub",
    phone: "+91 9876543210",
    email: "info@techsummit.com"
  },
  packages: [
    {
      id: 1,
      title: "Basic Package",
      description: "Includes entry to all workshops and networking sessions.",
      price: 500
    },
    {
      id: 2,
      title: "Premium Package",
      description: "Includes entry to all workshops, networking sessions, and a free tech gadget.",
      price: 1000
    }
  ],
  subEvents: [
    {
      id: 1,
      title: "AI Workshop",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Hackathon",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ]
};
const EventDetails = () => {
    return (
      <div className="bg-gray-50 pb-12font-sans text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{eventData.title}</h1>
              <p className="text-gray-500 text-sm">{eventData.id}</p>
             </div>
             <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
              <Share2 size={20} />
             </button>
            </div>
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LEFT COLUMN: Main Content (Spans 2 columns on Desktop) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Hero Image */}
                <div className="w-full h-64 sm:h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-sm">
                  <img 
                src={eventData.image} 
                alt={eventData.title} 
                className="w-full h-full object-cover"
              />
                </div>
                {/* Available Packages */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Available Packages</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventData.packages.map((pkg) => 
                    (<div key={pkg.id} className="border border-gray-100 bg-gray-50/50 rounded-xl p-5 hover:border-blue-200 transition-colors">
                      <h3 className="font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 min-h-[40px]">{pkg.description}</p>
                      <p className="text-blue-600 font-medium">₹ {pkg.price.toLocaleString()}</p>
                      </div>
                      ))}
                  </div>
                </div>
                {/* About the Event */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold mb-3">About the Event</h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {eventData.about}
                  </p>
                </div>
              </div>
              </div>
          </div>
      </div>
    );
}
export default EventDetails;