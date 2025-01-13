import { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://autonomize-ai-assignment-delta.vercel.app/users"
      );
      const data = await response.json();
      console.log(data);
      setUsers(data);
      // setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (username) => {
    try {
      const response = await fetch(
        `https://autonomize-ai-assignment-delta.vercel.app/users/${username}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (response.ok) {
        // Mark the user as deleted in the frontend
        setUsers(users.filter((user) => user.username !== username));
        alert(result.message);
      } else {
        alert(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      
      <h1 className="text-3xl font-bold mb-6 text-neutral-600">User List</h1>
      <table className="w-full table-auto border-collapse border border-gray-300 shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">SI.NO</th>
            <th className="border border-gray-300 px-4 py-2">IMAGE</th>
            <th className="border border-gray-300 px-4 py-2">NAME</th>
            <th className="border border-gray-300 px-4 py-2">LOCATION</th>
            <th className="border border-gray-300 px-4 py-2">FOLLOWERS</th>
            <th className="border border-gray-300 px-4 py-2">FOLLOWING</th>
            <th className="border border-gray-300 px-4 py-2">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={user.avatar_url}
                  alt="User Avatar"
                  className="h-12 w-12 rounded-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.location || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.followers}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.following}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(user.username)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  {user.is_deleted ? "Deleted" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
