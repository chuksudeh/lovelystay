import express from "express";
const router = express.Router();
import GithubRoute from "./github.route";

const defaultRoutes = [
  {
    path: "/github",
    route: GithubRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
