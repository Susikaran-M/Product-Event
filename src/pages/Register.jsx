import {useState} from 'react'
import { useNavigate ,Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('PARTICIPANT') 
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = async (e) => {
    e.preventDefault();
    try {
      alert('Registration successful! You can now log in.');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
           {/* the center white card */}
           <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
             {/* Back button */}
             <button 
                 onClick={() => navigate(-1)} 
                 className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-2"
               >
                 <FiArrowLeft className="mr-2" /> Back
               </button>
              {/* the top heading */}
               <div className="text-center">
                 <h2 className="text-indigo-500 font-medium text-sm tracking-wide">View Your Event</h2>
                 <h1 className="text-2xl font-semibold text-gray-900 mt-2">Create your 
                   account</h1>
               </div>
                {/* the register form */}
                <form onSubmit={handleRegister} className="space-y-4">  
           <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Account Type</label>
            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() => setRole('PARTICIPANT')}
                aria-pressed={role === 'PARTICIPANT'}
                className={`w-full py-1 rounded-xl font-medium transition-colors ${role === 'PARTICIPANT' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
              >
                Participant
              </button>
              <button
                type="button"
                onClick={() => setRole('ORGANIZER')}
                aria-pressed={role === 'ORGANIZER'}
                className={`w-full py-1 rounded-xl font-medium transition-colors ${role === 'ORGANIZER' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
              >
                Organizer
              </button>
            </div>
              </div>
                    
            <div>
            <label className="block text-base font-medium text-gray-900 mb-1">Full Name</label>
    
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-200 rounded-xl px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required
               />
            </div>
            
            <div>
            <label className="block text-base font-medium text-gray-900 mb-1">Phone</label>
    
            <input
                type="tel"
                value={contact}
                pattern="[0-9]{10}"
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-gray-200 rounded-xl px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required
                />
            </div>

              <div>
            <label className="block text-base font-medium text-gray-900 mb-1">Email</label>
    
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-200 rounded-xl px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required
               />
            </div>
                  <div>
            <label className="block text-base font-medium text-gray-900 mb-1">Password</label>
            
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-200 rounded-xl px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required
               />
              
            </div>

              <div>
            <label className="block text-base font-medium text-gray-900 mb-1">Confirm Password
            </label>
            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-200 rounded-xl px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required
               />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </button>
               </div>
            </div>

              <div>
                 <button 
            type="submit" 
            className="w-full bg-blue-600 text-white rounded-xl py-2 mt-2 font-medium hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
                </div>
                    </form>
                    {/* Footer */}
                    
                     <p className="text-center text-sm text-gray-600 ">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline pl-2">
            Log in
          </Link>
        </p>
               </div>
       </div>
    )
}

export default Register