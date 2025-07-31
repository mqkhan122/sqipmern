const CreateRole = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Role</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Role Name</label>
          <input
            type="text"
            placeholder="Enter role name"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Role
        </button>
      </form>
    </div>
  );
};

export default CreateRole;
