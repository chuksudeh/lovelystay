import { Command } from "commander";
import axios from "axios";

const program = new Command();

program
  .command("fetch <username>")
  .description("Fetch GitHub user data and store in the database")
  .action(async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:3300/github/fetch/${username}`
      );
      console.log(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        console.error("Error fetching user:", error.message);
      }
    }
  });

program
  .command("list")
  .description("List all GitHub users in the database")
  .action(async () => {
    try {
      const response = await axios.get("http://localhost:3300/github/users");
      console.log(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error listing users:", error.message);
      }
    }
  });

program
  .command("list-location <location>")
  .description("List GitHub users in the database by location")
  .action(async (location) => {
    try {
      const response = await axios.get(
        `http://localhost:3300/github/users/location/${location}`
      );
      console.log(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error listing users by location:", error.message);
      }
    }
  });

program.parse(process.argv);
