import express from "express";
import {
  fetchGitHubUser,
  listUsers,
  listUsersByLocation,
} from "../../controllers/github.controller";

const router = express.Router();

router.get("/fetch/:username", fetchGitHubUser);
router.get("/users", listUsers);
router.get("/users/location/:location", listUsersByLocation);

export default router;
