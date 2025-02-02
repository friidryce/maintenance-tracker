export default function EquipmentPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Equipment</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Equipment
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <p className="text-gray-600">No equipment found</p>
        </div>
      </div>
    </div>
  );
} 