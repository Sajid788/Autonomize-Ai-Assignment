import React, { useState } from "react";
import RepositoryListPage from "./components/RepositoryListPage";
import RepositoryDetails from "./components/RepositoryDetails";
import FollowersPage from "./components/FollowersPage";
import "./index.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [currentView, setCurrentView] = useState("home");
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleSearch = async (user_name) => {
    try {
      const userRes = await fetch(`http://localhost:8080/users/${user_name}`);
      const repoResAndFollowers = await fetch(
        `http://localhost:8080/users/${user_name}/repos`
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
    <div className="app border h-screen bg-gray-100">
      {currentView === "home" && (
        <div className="flex justify-center items-center h-full flex-col ">
          {/* <h1 className="text-2xl">GitHub User Finder</h1> */}
          <img src="https://pngimg.com/uploads/github/github_PNG76.png" alt="GitHub User Finder" 
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
          <button onClick={() => handleSearch(username)} className="bg-blue-600 text-white hover:bg-blue-700
          px-6 rounded shadow-md">Search</button>
          </div>
          
        </div>
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
    </div>
  );
};

export default App;
