import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
const App = () => {
 

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
          <Route path="/CreateEvent" element={<CreateEvent />} />
          <Route path="/EventDetails" element={<EventDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
