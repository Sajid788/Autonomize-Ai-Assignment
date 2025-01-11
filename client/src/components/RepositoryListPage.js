import React, { useState } from "react";

const RepositoryListPage = ({
  userData,
  repositories,
  followers,
  onRepoClick,
  onViewFollowers,
  onBack,
}) => {
  const [visibleRepos, setVisibleRepos] = useState(12); // State to track the number of visible repositories

  const handleShowMore = () => {
    setVisibleRepos((prev) => prev + 12); // Show 12 more repositories
  };

  return (
    <div className="w-[95%] m-auto bg-slate-100">
      <div className="flex lg:flex-row flex-col gap-5">
        <div className="lg:w-[30%] self-start">
          <div className="lg:p-10 p-4 flex-col items-center justify-center">
            <img
              src={userData.avatar_url}
              alt="User Avatar"
              className="h-40 w-40 rounded-full"
            />
            <h2 className="mt-2">{userData.name || userData.login}</h2>
            <p>{userData.bio}</p>
            <div className="flex gap-5 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded shadow-sm cursor-pointer px-6"
                onClick={onBack}
              >
                ← Back
              </button>
              <button
                onClick={onViewFollowers}
                className="bg-[#299f5c] hover:bg-[#207e49] rounded-md px-4 text-white py-1 cursor-pointer"
              >
                Followers ({followers.length})
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-[70%]  mt-10">
          <h3 className="text-2xl font-semibold text-neutral-400">Repositories</h3>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-4">
            {repositories.slice(0, visibleRepos).map((repo) => (
              <div key={repo.id} onClick={() => onRepoClick(repo)} className=" cursor-pointer">
                <div className="flex gap-4">
                  <img
                    src={userData.avatar_url}
                    alt="User Avatar"
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <div className="flex gap-2 items-center">
                    <h4 className="font-bold text-lg text-blue-700">{repo.name}</h4>
                    <img
                    src="https://www.pinnacle.in/wp-content/uploads/2023/05/green-tick.png"
                    alt="User Avatar"
                    className="h-4 "
                  />
                    </div>
                    
                    <p className="line-clamp-3 text-sm text-neutral-500">
                      {repo.description || "No description provided."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {visibleRepos < repositories.length && (
            <div className="mt-8 text-center">
              <button
                onClick={handleShowMore}
                className=" text-blue-500 text-xl rounded px-4 py-2"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoryListPage;
