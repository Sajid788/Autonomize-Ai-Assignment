import React, { useState } from "react";
import RepositoryListPage from "./components/RepositoryListPage";
import RepositoryDetails from "./components/RepositoryDetails";
import FollowersPage from "./components/FollowersPage";
import "./index.css";
import UserList from "./components/UserList";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [currentView, setCurrentView] = useState("home");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSearch = async (user_name) => {
    setIsLoading(true);
    try {
      const userRes = await fetch(
        `https://autonomize-ai-assignment-delta.vercel.app/users/${user_name}`
      );
      const repoResAndFollowers = await fetch(
        `https://autonomize-ai-assignment-delta.vercel.app/users/${user_name}/repos`
      );

      if (userRes.ok && repoResAndFollowers.ok) {
        const userData = await userRes.json();
        const { repoRes, followersRes } = await repoResAndFollowers.json();

        setUserData(userData?.user);
        setRepositories(repoRes);
        setFollowers(followersRes);
        setCurrentView("repoList");
      } else {
        alert("User not found!");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching data!");
      setIsLoading(false);
    }
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
    setCurrentView("repoDetails");
  };

  const handleFollowerClick = async (follower) => {
    setUsername(follower.login);
    await handleSearch(follower.login);
  };

  return (
    <div className="">
      {currentView === "home" && (
        <>
  

          <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-6 py-3">
              {/* Logo */}
              <div className="text-2xl font-bold">
                <a href="/" className="hover:text-gray-200">
                  GitHub Profile
                </a>
              </div>

              {/* dummy logo */}
              <div className="flex items-center space-x-8">
                {/* Navbar Links */}
                <ul className="flex space-x-6">
                  <li>
                    <button
                     onClick={() => setCurrentView("userList")}
                      className="text-xl hover:text-gray-200 transition font-bold  duration-300"
                    >
                      User List
                    </button>
                  </li>
                </ul>
                <img
                  src="https://store-images.s-microsoft.com/image/apps.18073.7ab38b27-6fcf-43cf-ade7-391a5e6e3c35.0c5d870c-9aac-4f02-9e2c-f2f5be6de053.3954d5b9-ffce-4978-bbdd-73c83ff0f39f"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
              </div>
            </div>
          </nav>
          <div className="border h-[35rem] ">
            <div className="flex justify-center   items-center h-full flex-col border  ">
              <img
                src="https://pngimg.com/uploads/github/github_PNG76.png"
                alt="GitHub User Finder"
                className=" h-24 object-contain"
              />
              <div className="mt-5 flex gap-4">
                <input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="py-2 px-4 border border-blue-500 rounded-md "
                />
                <button
                  onClick={() => handleSearch(username)}
                  className="bg-blue-600 text-white hover:bg-blue-700
          px-6 rounded shadow-md"
        
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {currentView === "repoList" && (
        <RepositoryListPage
          userData={userData}
          repositories={repositories}
          followers={followers}
          onRepoClick={handleRepoClick}
          onViewFollowers={() => setCurrentView("followers")}
          onBack={() => setCurrentView("home")}
        />
      )}

      {currentView === "repoDetails" && (
        <RepositoryDetails
          repo={selectedRepo}
          onBack={() => setCurrentView("repoList")}
        />
      )}

      {currentView === "followers" && (
        <FollowersPage
          followers={followers}
          onFollowerClick={handleFollowerClick}
          onBack={() => setCurrentView("repoList")}
        />
      )}
       {currentView === "userList" && <UserList />}
    </div>
  );
};

export default App;
