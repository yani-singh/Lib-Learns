import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {

  const user = {
    userName: "Yashraj"
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar user={user} />

      <div className="max-w-6xl mx-auto p-6">

        {/* Greeting */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Hello, {user.userName} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Ready to study?
          </p>

        </div>

        {/* Book Seat */}

        <div className="bg-white rounded-2xl shadow p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Start Your Session
          </h2>

          <button className="bg-[#556B2F] text-white px-6 py-3 rounded-lg">
            Book a Seat
          </button>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3>Total Seats</h3>
            <p className="text-4xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3>Available Seats</h3>
            <p className="text-4xl font-bold mt-2">98</p>
          </div>

        </div>

        {/* Booking & Streak */}

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <div className="bg-white rounded-2xl p-6 shadow">

            <h3 className="font-semibold">
              Active Booking
            </h3>

            <p className="mt-3">
              Seat A12
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow">

            <h3 className="font-semibold">
              Study Streak
            </h3>

            <p className="mt-3">
              🔥 12 Days
            </p>

          </div>

        </div>

        {/* Chart */}

        <div className="bg-white rounded-2xl p-6 shadow mb-6">

          <h3 className="text-xl font-semibold mb-4">
            Study Hours This Week
          </h3>

          <div className="h-48 flex items-end justify-around">

            <div className="w-8 h-16 bg-gray-300 rounded"></div>
            <div className="w-8 h-24 bg-gray-300 rounded"></div>
            <div className="w-8 h-40 bg-[#556B2F] rounded"></div>
            <div className="w-8 h-28 bg-gray-300 rounded"></div>
            <div className="w-8 h-20 bg-gray-300 rounded"></div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-4 gap-4">

          <button className="bg-white rounded-xl shadow p-4">
            Book Seat
          </button>

          <button className="bg-white rounded-xl shadow p-4">
            My Bookings
          </button>

          <button className="bg-white rounded-xl shadow p-4">
            Plans
          </button>

          <button className="bg-white rounded-xl shadow p-4">
            Profile
          </button>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default Dashboard;