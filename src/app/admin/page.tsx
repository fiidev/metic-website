export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500">Divisions</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">3</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500">Members</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">85</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-sm font-medium text-gray-500">Portfolios</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">27</p>
        </div>
      </div>
    </div>
  );
}
