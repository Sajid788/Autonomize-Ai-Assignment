import React from "react";

const RepositoryDetails = ({ repo, onBack }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Back to Repositories Button */}
      <div className="w-full max-w-3xl mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <span className="text-lg">←</span>
          <span>Back to Repositories</span>
        </button>
      </div>

      {/* Card Container */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        {/* Avatar and Name Section */}
        <div className="flex items-center mb-6">
          <img
            src={repo.owner?.avatar_url || "https://via.placeholder.com/50"}
            alt="Avatar"
            className="w-14 h-14 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {repo.name || "Repository Name"}
            </h2>
            <p className="text-gray-600">
              {repo.description || "GitHub Desktop tutorial repository"}
            </p>
          </div>
        </div>

        {/* Repository Stats */}
        <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md mb-6">
          <div>
            <p className="text-sm text-gray-500">Language</p>
            <p className="text-gray-800 font-medium">
              {repo.language || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Stars</p>
            <p className="text-gray-800 font-medium">{repo.stargazers_count || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Forks</p>
            <p className="text-gray-800 font-medium">{repo.forks_count || 0}</p>
          </div>
        </div>

        {/* View on GitHub Button */}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default RepositoryDetails;
