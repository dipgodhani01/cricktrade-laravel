function Dashboard() {
  return (
    <div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-medium">My Auction List</h2>
        <button className="bg-green-700 block text-white px-4 py-2 mt-4 rounded mx-auto">
          + Add Auction
        </button>

        <div className="mt-4 overflow-x-auto table-responsive">
          <div className="p-4 text-center text-red-600 text-xl md:text-2xl font-medium">
            No Auction Available
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
