import React from "react";

const FollowersPage = ({ followers, onFollowerClick, onBack }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={onBack}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        ← Back to Repositories
      </button>
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">Followers</h3>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
        {followers.map((follower) => (
          <li
            key={follower.id}
            className="list-none p-4 bg-white shadow rounded-lg text-center hover:shadow-lg cursor-pointer"
            onClick={() => onFollowerClick(follower)}
          >
            <img
              src={follower.avatar_url}
              alt="Follower Avatar"
              className="h-16 w-16 rounded-full mx-auto mb-4"
            />
            <h4 className="text-lg font-medium text-gray-800">{follower.login}</h4>
          </li>
        ))}
      </div>
    </div>
  );
};

export default FollowersPage;
