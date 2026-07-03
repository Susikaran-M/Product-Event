import Navbar from "../components/Navbar";

const Home = () => {
  return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to View Your Event</h1>
        <p className="mt-4 text-gray-600">The Event Cards will go here soon.</p>
      </main>
  </div>
  );
};

export default Home;