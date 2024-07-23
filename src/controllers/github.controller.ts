import { Request, Response } from "express";
import db from "../database/connect";
import { githubUserSchema } from "../database/githubuser.model";
import { GitHubService } from "../services";

export const fetchGitHubUser = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    await db.none(githubUserSchema);
    const userData = await GitHubService.fetchGitHubUserData(username);
    await GitHubService.saveUserToDatabase(userData);
    res.status(200).json({
      message: "User data fetched and saved successfully",
      data: userData,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await GitHubService.getAllUsers();
    res.status(200).json({ message: "Success", data: users });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const listUsersByLocation = async (req: Request, res: Response) => {
  const { location } = req.params;
  try {
    const users = await GitHubService.getUsersByLocation(location);
    res.status(200).json({ message: "Success", data: users });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
