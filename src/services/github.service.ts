import axios from "axios";
import db from "../database/connect";

export const fetchGitHubUserData = async (username: string) => {
  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`
  );
  const reposResponse = await axios.get(userResponse.data.repos_url);
  const languages = new Set<string>();
  for (const repo of reposResponse.data) {
    if (repo.language) languages.add(repo.language);
  }

  return {
    username: userResponse.data.login,
    name: userResponse.data.name,
    location: userResponse.data.location,
    bio: userResponse.data.bio,
    public_repos: userResponse.data.public_repos,
    followers: userResponse.data.followers,
    following: userResponse.data.following,
    languages: Array.from(languages),
  };
};

export const saveUserToDatabase = async (userData: any) => {
  try {
    await db.tx(async (t) => {
      const userInsertQuery = `
        INSERT INTO github_users (username, name, location, bio, public_repos, followers, following)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
      `;
      const userValues = [
        userData.username,
        userData.name,
        userData.location,
        userData.bio,
        userData.public_repos,
        userData.followers,
        userData.following,
      ];
      const result = await t.one(userInsertQuery, userValues);
      const userId = result.id;

      const languageInsertQuery = `
        INSERT INTO programming_languages (user_id, language)
        VALUES ($1, $2);
      `;
      const languagePromises = userData.languages.map((language: any) =>
        t.none(languageInsertQuery, [userId, language])
      );

      await Promise.all(languagePromises);
    });
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  const result = await db.any("SELECT * FROM github_users");
  return result;
};

export const getUsersByLocation = async (location: string) => {
  const result = await db.any(
    "SELECT * FROM github_users WHERE location = $1",
    [location]
  );
  return result;
};
