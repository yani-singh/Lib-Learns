const StudyChart = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">

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
  );
};

export default StudyChart;