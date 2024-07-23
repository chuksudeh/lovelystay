export const githubUserSchema = `
CREATE TABLE IF NOT EXISTS github_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  name VARCHAR(100),
  location VARCHAR(100),
  bio TEXT,
  public_repos INT,
  followers INT,
  following INT
);
`;

export const programmingLanguageSchema = `
CREATE TABLE IF NOT EXISTS programming_languages (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES github_users(id),
  language VARCHAR(50) NOT NULL
);
`;
