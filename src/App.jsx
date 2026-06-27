import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
const App = () => {
    const Home = () => <div className="p-10 text-2xl font-bold text-blue-500">Home Page (Public Marketplace)</div>;
const Login = () => <div className="p-10 text-2xl font-bold">Login Page</div>;
const Register = () => <div className="p-10 text-2xl font-bold">Register Page</div>;
const Events = () => <div className="p-10 text-2xl font-bold">Event Details Page</div>;
const Dashboard = () => <div className="p-10 text-2xl font-bold text-green-600">Organizer Dashboard</div>;
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<Events />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
