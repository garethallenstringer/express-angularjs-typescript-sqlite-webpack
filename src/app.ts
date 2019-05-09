import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import express = require("express");
import helmet = require("helmet");
import path = require("path");
import {Express} from "express";
import Routes from "./routes/Routes";
import DB from "./config/sqlite-config";

export const defaultDbUri = path.resolve(__dirname, "storage/people.db");

class App {

  public app: Express;

  constructor() {
    this.app = express();
    this.config(defaultDbUri);
  }

  private async config(dbUri: string) {
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "public/dist")));
    try {
      await Routes.register(this.app);
      const db = await new DB(dbUri);
      await db.createTables();
    } catch (err) {
      throw err;
    }
  }
}

export default new App().app;
