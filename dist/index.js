"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const v1_1 = __importDefault(require("./routes/v1"));
const connect_1 = __importDefault(require("./database/connect"));
const schemaSetup_1 = __importDefault(require("./database/schemaSetup"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("hello world");
});
app.post("/", (req, res) => {
    res.send({
        data: req.body,
    });
});
app.use("/", v1_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
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
        yield (0, schemaSetup_1.default)();
        connect_1.default.connect()
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
    }
    catch (error) {
        console.error("Error setting up schemas", error);
    }
});
startServer();
