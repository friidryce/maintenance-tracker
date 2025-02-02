export default function MaintenanceRecordsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maintenance Records</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Record
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <p className="text-gray-600">No maintenance records found</p>
        </div>
      </div>
    </div>
  );
} 