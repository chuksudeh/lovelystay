import express from "express";
import bodyParser from "body-parser";
import { Response, Request } from "express";
import routes from "./routes/v1";
import db from "./database/connect";
import createSchemas from "./database/schemaSetup";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.post("/", (req: Request, res: Response) => {
  res.send({
    data: req.body,
  });
});

app.use("/", routes);

const startServer = async () => {
  // try {
  //   await createSchemas();
  //   pool.connect((err) => {
  //     if (err) {
  //       console.log("Error connecting to DB", err);
  //     } else {
  //       console.log("Successfully connected to the database");
  //       app.listen(3300, () => {
  //         console.log("App listening on port 3300");
  //       });
  //     }
  //   });
  // } catch (error) {
  //   console.error("Error setting up schemas", error);
  // }

  try {
    await createSchemas();
    db.connect()
      .then((obj) => {
        obj.done();
        console.log("Successfully connected to the database");
        app.listen(3300, () => {
          console.log("App listening on port 3300");
        });
      })
      .catch((error) => {
        console.log("Error connecting to the database", error);
      });
  } catch (error) {
    console.error("Error setting up schemas", error);
  }
};

startServer();
