const Navbar = ({ user }) => {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#556B2F]">
          Lib-Learn
        </h1>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#556B2F] text-white flex items-center justify-center">
            {user?.userName?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;