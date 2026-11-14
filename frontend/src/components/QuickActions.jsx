const QuickActions = () => {
  return (
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
  );
};

export default QuickActions;