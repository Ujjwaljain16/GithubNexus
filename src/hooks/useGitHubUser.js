import { useState, useEffect } from 'react';
import axios from 'axios';
//define
const useGitHubUser = (username, page = 1, perPage = 5) => {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [readme, setReadme] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [languageStats, setLanguageStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalRepos, setTotalRepos] = useState(0);

  useEffect(() => {
  if (!username) {
    setUser(null);
    setRepositories([]);
    setReadme(null);
    setOrganizations([]);
    setLanguageStats({});
    setError(null);
    setTotalRepos(0);
    return;
  }

//fetch
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [userResponse, reposResponse, orgsResponse] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/users/${username}/repos?sort=updated&page=${page}&per_page=${perPage}`),
          axios.get(`https://api.github.com/users/${username}/orgs`)
        ]);
        
        setUser(userResponse.data);
        setRepositories(reposResponse.data);
        setOrganizations(orgsResponse.data);
        setTotalRepos(userResponse.data.public_repos);
        try {
          const readmeResponse = await axios.get(
            `https://api.github.com/repos/${username}/${username}/readme`,
            { headers: { Accept: 'application/vnd.github.html+json' } }
          );
          setReadme(readmeResponse.data);
        } catch (readmeErr) {
          // It's okay if README doesn't exist
          console.log("User doesn't have a profile README or it's not accessible");
          setReadme(null);
        }
        const languageData = {};
        await Promise.all(
          reposResponse.data.map(async (repo) => {
            if (repo.languages_url) {
              try {
                const langResponse = await axios.get(repo.languages_url);
                const repoLangs = langResponse.data;
                
                Object.entries(repoLangs).forEach(([lang, bytes]) => {
                  languageData[lang] = (languageData[lang] || 0) + bytes;
                });
              } catch (err) {
                console.log(`Couldn't fetch languages for ${repo.name}`);
              }
            }
          })
        );
        
        setLanguageStats(languageData);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);

        if (err.response && err.response.status === 404) {
          setError(`User '${username}' not found`);
        } else if (err.response && err.response.status === 403) {
          setError("API rate limit exceeded. Please try again later.");
        } else {
          setError("An error occurred while fetching data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

   
    fetchData();
  }, [username, page, perPage]);

   const totalPages = Math.ceil(totalRepos / perPage);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return { 
    user, 
    repositories, 
    readme,
    organizations,
    languageStats,
    loading, 
    error,
    pagination: {
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPrevPage,
      totalRepos
    }
  };
};

export default useGitHubUser;