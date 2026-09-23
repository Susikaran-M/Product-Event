import {useState} from 'react';
import { ArrowLeft, Plus,Trash2, UploadCloud } from 'lucide-react';
const CreateEvent = () => {
    const indiaLocations = {
  "Tamil Nadu": ["Coimbatore", "Chennai", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tenkasi"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"]
};
const [formData, setFormData] = useState({
    // Org Details
    orgName: '',
    contacts: [{ number: '', name: '' }],
    email: '',
    // Event Details
    eventDays: 1,
    startDate: '',
    startTime: '',
    category: 'Entertainment',
    state: '',
    district: '',
    location: '',
    // Event Config
    isTeamEvent: false,
    maxTeamSize: 2,
    // Media & Descriptions
    bannerImage: null, // Stores preview URL
    bannerImageFile: null, // Stores actual file
    aboutEvent: '',
    conditions: '',
    orgIdImage: null, // Stores preview URL
    orgIdImageFile: null, // Stores actual file
    // Sub Events
    subEvents: [],
    // Payments & Packages
    paymentRequired: false,
    packages: [{ title: '', description: '', amount: '' }],
    qrCodeImage: null, // Stores preview URL
    qrCodeImageFile: null, // Stores actual file
    coordinatorEmails: ''
  });
  //handle array changes for sub-events, contacts, and packages
  const handleArrayChange = (arrayName, index, field, value) => {
    const newArray = [...formData[arrayName]];//old array
    newArray[index][field] = value;//assigns new value
    setFormData(prevData => ({
      ...prevData,
      [arrayName]: newArray
    }));
  };
  // hadles changes for text and checkbox inputs
  const handleChange = (e) => {
    const { name, value ,type ,checked} = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  }
  
  //adds default placeholder object to the array
  const addArrayItem= (arrayName,defaultObject) => {
    setFormData((prev)=>({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultObject]
    }));
  };
  const removeArrayItem = (arrayName, index) => {
    const newArray = [...formData[arrayName]].filter((_, i) => i !== index);
    setFormData(prevData => ({
      ...prevData,
      [arrayName]: newArray
    }));
  };
  //handles image uploads and creates a preview URL
  const handleImageUpload = (e, fileName) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData(prevData => ({
        ...prevData,
        [fileName]: previewURL,
        [`${fileName}File`]: file
      }));
    } 
  }
  //handles image removal and revokes the preview URL
  const handleRemoveImage = (fieldName) => {
    if (formData[fieldName]) {
      URL.revokeObjectURL(formData[fieldName]);
    }
    setFormData(prev => ({
      ...prev,
      [fieldName]: null,
      [`${fieldName}File`]: null
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Event received successfully! Check console for details.');
  }
return(
    <div className="min-h-screen bg-gray-50 pb-12 font-sans text-gray-900">
      {/* top nav */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    <ArrowLeft size={18} className="mr-1" /> Back to Home
                </button>
                <h1 className="text-xl font-bold hidden sm:block border-l pl-4 border-gray-300">Create Your Event</h1>
                </div>
        </div>
        {/* form container */}
        <div className="max-w-3xl mx-auto mt-8 px-4">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Organization Details */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100">Organization Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="orgName"  className="block text-sm font-medium mb-1">Organization / Institution / Club Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="orgName"
                    name="orgName"
                    required
                    value={formData.orgName}
                    onChange={handleChange}
                    className=" w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2">
                      <label className="block text-sm font-medium">Contact Numbers <span className="text-red-500">*</span></label>
                      {/* Logic: Only show Add button if contacts < 3 */}
                      {formData.contacts.length < 3 && (
                        <button
                          type="button"
                          onClick={() => addArrayItem('contacts', { number: '', name: '' })}
                          className="flex items-center text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
                        >
                          <Plus size={14} className="mr-1" /> Add
                        </button>
                      )}
                  </div>
                  {/* this is for contact inputs */}
                  <div>
                      {formData.contacts.map((contact, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-3 mb-4 md:items-center bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-lg border border-gray-100 md:border-none">
                          <input
                            type="text"
                            placeholder="Contact Number"
                            value={contact.number}
                            onChange={(e) => handleArrayChange('contacts', index, 'number', e.target.value)}
                            className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                            required
                            />
                            <input
                            type="text"
                            placeholder="Cordinator or SubCordinator "
                            value={contact.name}
                            onChange={(e) => handleArrayChange('contacts', index, 'name', e.target.value)}
                            className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                            />
                            {formData.contacts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem('contacts', index)}
                                className="text-red-500 hover:bg-red-100 p-2 rounded-lg flex items-center justify-center md:justify-start w-full md:w-auto"
                              >
                                <Trash2 size={14} className="mr-1" /> 
                                <span className="md:hidden ml-2 text-sm font-medium">Remove Contact</span>
                              </button>
                            )}
                        </div>
                      ))}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      </div>
                      </div>
                  </div>
                </div>
                {/* 2. EVENT DETAILS */}

                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100">Event Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label htmlFor="eventDays"
                          className="block text-sm font-medium mb-1"
                          >Number of Event Days<span className="text-red-500">*</span></label>
                          <input
                            type="number"
                            id="eventDays"
                            name="eventDays"
                            min="1"
                            value={formData.eventDays}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date <span className="text-red-500">*</span></label>
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="startTime" className="block text-sm font-medium mb-1">Start Time <span className="text-red-500">*</span></label>
                          <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium mb-1">Event Category <span className="text-red-500">*</span></label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="Professional">Professional</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Sports">Sports</option>
                            </select>
                            </div>
                            {/* Cascading Location */}
                            <div>
                              <label htmlFor="state" className="block text-sm font-medium mb-1">State <span className="text-red-500">*</span></label>
                              <select 
                                id="state"
                                name="state"
                                required
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                              >
                                <option value="">Select State</option>
                                {Object.keys(indiaLocations).map((state) => (
                                  <option key={state} value={state}>{state}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label htmlFor="district" className="block text-sm font-medium mb-1">District <span className="text-red-500">*</span></label>
                              <select 
                                id="district"
                                name="district"
                                required
                                value={formData.district}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                              >
                                <option value="">Select District</option>
                                {formData.state && indiaLocations[formData.state].map((district) => (
                                  <option key={district} value={district}>{district}</option>
                                ))}
                              </select>
                              </div>
                              <div className="mb-6 md:col-span-2">
                                <label htmlFor="location" className="block text-sm font-medium mb-1">Location / Address <span className="text-red-500">*</span></label>
                                <textarea
                                  id="location"
                                  name="location"
                                  rows="3"
                                  required
                                  value={formData.location}
                                  onChange={handleChange}
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                              </div>
                              {/* Team configuration box */}
                              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-6 md:col-span-2">
                                <h3 className="text-sm font-medium text-indigo-900 mb-3">Team Configuration</h3>
                                <div className="mb-4">
                                  <label className="block text-sm font-medium mb-1">
                                    is this a Team Event? <span className="text-red-500">*</span>
                                  </label>
                                  <div className="flex items-center gap-4">
                                    <label
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                    ><input
                                    type="radio"
                                    name="isTeamEvent"
                                    checked={formData.isTeamEvent}
                                    onChange={() => setFormData(p => ({ ...p, isTeamEvent: true }))}
                                    className="w-4 h-4 text-blue-600"
                                    />yes</label>
                                    <label
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                    ><input
                                    type="radio"
                                    name="isTeamEvent"
                                    checked={!formData.isTeamEvent}
                                    onChange={() => setFormData(p => ({ ...p, isTeamEvent: false }))}
                                    className="w-4 h-4 text-blue-600"
                                    />No</label>
                                  </div>
                                </div>
                                {formData.isTeamEvent && (
                                  <div>
                                  <label htmlFor="maxTeamSize" className="block text-sm font-medium mb-1">
                                    Maximum Team Size <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    id="maxTeamSize"
                                    name="maxTeamSize"
                                    min="2"
                                    max="20"
                                    value={formData.maxTeamSize}
                                    onChange={handleChange}
                                    className="w-full  border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                  />
                                   <p className="text-xs text-indigo-500 mt-1">Enter a number between 2 and 20</p>
                                  </div>
                                )}
                              </div>
                              {/* Image preview & text areas */}
                              <div className="space-y-4 md:col-span-2">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Banner Image <span className="text-red-500">*</span></label>
                                    {formData.bannerImage ? (
                                    <div className="relative w-full h-48 rounded-xl overflow-hidden group border border-gray-200 shadow-sm">
                                        <img src={formData.bannerImage} alt="Banner Preview" className="w-full h-full object-cover " />
                                      {/* dark overlay with change and remove buttons */}
                                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 backdrop-blur-sm">
                                      <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm">
                                       <UploadCloud size={16} className="mb-2" />
                                       <span className="text-sm font-medium">Change</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload(e, 'bannerImage')}
                                          className="hidden"
                                        />
                                        </label>
                                        <button
                                        type="button"
                                        onClick={() => handleRemoveImage('bannerImage')}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2 shadow-sm"
                                        >
                                          <Trash2 size={16} />Remove
                                        </button>
                                      </div>
                                      </div>
                                    ):(
                                      //for empty image upload
                                     <label
                                     className="block w-full border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                                     >
                                      <div className="py-10 flex flex-col items-center justify-center text-blue-500">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                       <UploadCloud size={24} />
                                       </div>
                                       <span className="text-sm font-medium text-gray-700">Click to upload banner</span>
                                      </div>
                                      <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => handleImageUpload(e, 'bannerImage')} 
                                        className="hidden" 
                                      />
                                     </label>
                                    )}
                                  
                                </div>
                                <div>
                                  <label htmlFor="aboutEvent" className="block text-sm font-medium mb-1">About the Event <span className="text-red-500">*</span></label>  
                                  <textarea
                                    id="aboutEvent"
                                    name="aboutEvent"
                                    placeholder="Describe your event..."
                                    rows="4"
                                    required
                                    value={formData.aboutEvent}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                  />
                                </div>
                                <div>
                                   <label htmlFor="conditions" className="block text-sm font-medium mb-1">Conditions / Important Notes (Optional)</label>
                                   <textarea
                                     id="conditions"
                                     name="conditions"
                                     placeholder="Enter any conditions or important notes..."
                                     rows="4"
                                     value={formData.conditions}
                                     onChange={handleChange}
                                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                   />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Organization Or Government ID <span className="text-red-500">*</span></label>
                                    {formData.orgIdImage ? (
                                    <div className="relative w-full h-48 rounded-xl overflow-hidden group border border-gray-200 shadow-sm">
                                        <img src={formData.orgIdImage} alt="Organization ID Preview" className="w-full h-full object-cover " />
                                      {/* dark overlay with change and remove buttons */}
                                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 backdrop-blur-sm">
                                      <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm">
                                       <UploadCloud size={16} className="mb-2" />
                                       <span className="text-sm font-medium">Change</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload(e, 'orgIdImage')}
                                          className="hidden"
                                        />
                                        </label>
                                        <button
                                        type="button"
                                        onClick={() => handleRemoveImage('orgIdImage')}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2 shadow-sm"
                                        >
                                          <Trash2 size={16} />Remove
                                        </button>
                                      </div>
                                      </div>
                                    ):(
                                      //for empty image upload
                                     <label
                                     className="block w-full border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                                     >
                                      <div className="py-10 flex flex-col items-center justify-center text-blue-500">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                       <UploadCloud size={24} />
                                       </div>
                                       <span className="text-sm font-medium text-gray-700">Click to Upload Proof</span>
                                      </div>
                                      <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => handleImageUpload(e, 'orgIdImage')} 
                                        className="hidden" 
                                      />
                                     </label>
                                    )}
                                  
                                </div>
                                </div>
                    </div>  
                    </div>
                    {/* Sub Events */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                        <h2 className="text-lg font-semibold">Sub Events</h2>
                        <button
                          type="button"
                          onClick={() => addArrayItem('subEvents', { name: '', about: '', isGroup: false, needId: false })} className="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          <Plus size={16} className="mr-1" /> Add Sub Event
                        </button>
                      </div> 
                      {formData.subEvents.length === 0 ? (
                           <p className="text-gray-500 text-sm text-center py-4">No sub-events added. Click the button above to add one.</p>
                      ) : (
                      <div className="space-y-6">
                        {formData.subEvents.map((sub, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative">
                             <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900">Sub Event {index + 1}</h4>
                      <button type="button" onClick={() => removeArrayItem('subEvents', index)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md"><Trash2 size={18}/></button>
                    </div>
                           <div className="space-y-4">
                          <div>
                             <label className="block text-sm font-medium mb-1" htmlFor={`subName-${index}`}>Sub Event Name</label>
                        <input type="text" id={`subName-${index}`} name="subName" value={sub.name} onChange={(e) => handleArrayChange('subEvents' ,index, 'name', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" required/>
                            </div>
                         <div>
                        <label className="block text-sm font-medium mb-1" htmlFor={`subAbout-${index}`}>About Sub Event</label>
                        <textarea rows="3" id={`subAbout-${index}`} name="subAbout" value={sub.about} onChange={(e) => handleArrayChange('subEvents' ,index, 'about', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none" required></textarea>
                      </div>
                       <div className="flex flex-col gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">Is this a group event? <span className="text-red-500">*</span></label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" checked={sub.isGroup} onChange={() => handleArrayChange('subEvents', index, 'isGroup', true)} className="w-4 h-4 text-blue-600" /> Yes</label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" checked={!sub.isGroup} onChange={() => handleArrayChange('subEvents' ,index, 'isGroup', false)} className="w-4 h-4 text-blue-600" /> No</label>
                          </div>
                        </div>
                         <label className="flex items-center gap-2 text-sm font-medium cursor-pointer mt-2">
                          <input type="checkbox" checked={sub.needId} onChange={(e) => handleArrayChange('subEvents', index, 'needId', e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                          Need participant ID?
                        </label>

                        </div>
                            </div>
                          </div>
                        ))}
                        </div>
                        )}
                    </div>
                    {/* 4. ADDITIONAL SETTINGS (PAYMENTS) */}
                       <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                         <h2 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-100">Additional Settings</h2>
                        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer mb-6">
                      <input type="checkbox" name="paymentRequired" checked={formData.paymentRequired} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded border-gray-300" />
                      Payment required?
                    </label>
                    {formData.paymentRequired && (
                     <div className="border border-gray-200 rounded-xl p-5 mb-6 bg-gray-50/50">
                      <h3 className="font-semibold text-sm mb-4">Event Packages</h3>
                       {formData.packages.map((pkg, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 mb-4 relative shadow-sm">
                    {formData.packages.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem('packages', index)} className="absolute top-3 right-3 text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                    )}
                  <div className="space-y-3">
                    <div>
                       <label className="block text-xs font-medium text-gray-500 mb-2">Package Title</label>
                        <input type="text" placeholder="e.g., Basic Package" value={pkg.title} onChange={(e) => handleArrayChange('packages', index, 'title', e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />

                    </div>
                    <div>
                       <label className="block text-xs font-medium text-gray-500 mb-1">Package Description</label>
                        <textarea rows="2" placeholder="Describe what's included..." value={pkg.description} onChange={(e) => handleArrayChange('packages', index, 'description', e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" required></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Package Amount (₹)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                          <input type="number" min="0" placeholder="500" value={pkg.amount} onChange={(e) => handleArrayChange('packages', index, 'amount', e.target.value)} className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
                        </div>
                    </div>
                  </div>
                    </div>
                       ))}
                       <button type="button" onClick={() => addArrayItem('packages', { title: '', description: '', amount: '' })} className="flex items-center text-sm text-gray-600 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                  <Plus size={16} className="mr-1" /> Add Package
                </button>
                  {/* The QR Code Upload */}
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <label className="block text-sm font-medium mb-2">QR Code for Event Payment</label>
                    <div className="flex items-center gap-4">
                       {formData.qrCodeImage ? (
                                    <div className="relative w-full h-48 rounded-xl overflow-hidden group border border-gray-200 shadow-sm">
                                        <img src={formData.qrCodeImage} alt="Organization ID Preview" className="w-full h-full object-cover " />
                                      {/* dark overlay with change and remove buttons */}
                                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4 backdrop-blur-sm">
                                      <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm">
                                       <UploadCloud size={16} className="mb-2" />
                                       <span className="text-sm font-medium">Change</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => handleImageUpload(e, 'qrCodeImage')}
                                          className="hidden"
                                        />
                                        </label>
                                        <button
                                        type="button"
                                        onClick={() => handleRemoveImage('qrCodeImage')}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2 shadow-sm"
                                        >
                                          <Trash2 size={16} />Remove
                                        </button>
                                      </div>
                                      </div>
                                    ):(
                                      //for empty image upload
                                     <label
                                     className="block w-full border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                                     >
                                      <div className="py-10 flex flex-col items-center justify-center text-blue-500">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                       <UploadCloud size={24} />
                                       </div>
                                       <span className="text-sm font-medium text-gray-700">Click to QR Code</span>
                                      </div>
                                      <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => handleImageUpload(e, 'qrCodeImage')} 
                                        className="hidden" 
                                      />
                                     </label>
                                    )}
                       </div>
                  </div>
                      </div>
                      )
                    }
                    <div>
              <label className="block text-sm font-medium mb-1">Coordinator Emails (comma-separated)</label>
              <input type="text" name="coordinatorEmails" value={formData.coordinatorEmails} onChange={handleChange} placeholder="email1@example.com, email2@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
              <p className="text-xs text-gray-500 mt-1">These coordinators will have access to participant details and can manage registrations</p>
            </div>
          
                </div>

                <div className="pt-4 pb-8">
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl transition-colors shadow-sm text-lg">
                Publish Event
              </button>
            </div>
          
            </form>
          </div>
    </div>
)
}
export default CreateEvent;