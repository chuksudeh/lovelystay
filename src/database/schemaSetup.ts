import db from "./connect";
import {
  githubUserSchema,
  programmingLanguageSchema,
} from "./githubuser.model";

const createSchemas = async () => {
  try {
    await db.tx(async (t) => {
      await t.none(githubUserSchema);
      await t.none(programmingLanguageSchema);
    });
    console.log("Schemas created successfully");
  } catch (error) {
    console.error("Error creating schemas", error);
    throw error;
  }
};

export default createSchemas;
