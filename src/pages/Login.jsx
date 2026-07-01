import{useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate ,Link } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login('Organizer'); // Assuming the user is an organizer for this example
      navigate('/dashboard');
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
          <h1 className="text-2xl font-semibold text-gray-900 mt-2">Welcome back!</h1>
        </div>
        {/* the login form */}
        <form onSubmit={handleLogin} className="space-y-4">

            <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-1">Email</label>
    
            <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required
               />
            </div>
            <div >
              <label htmlFor="password" className="block text-base font-medium text-gray-900 mb-1">Password</label>
            <div className="relative">
            <input
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
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
                <a href="#" className="text-sm text-blue-600 font-medium hover:underline">Forgot password</a>
            </div>
            <div>
                <button 
            type="submit" 
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
            </div>
        </form>
        {/* the OR divider */}
        <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-500 text-sm ">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
        </div>
        {/* signin with google */}
        <div>
          <button className="w-full border border-gray-300 rounded-xl py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>
        </div>
        {/* the signup link */}
        <p className="text-center text-sm text-gray-600 ">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-medium hover:underline pl-2">
            Sign up as new user
          </Link>
        </p>
    </div>

    </div>
  );
};

export default Login;