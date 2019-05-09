import {Express} from "express";
import PersonRoutes from "./person-routes";

export default class Routes {
  public static async register(app: Express) {
    try {
      app.route("/api").all(async (req, res) => res.json("Welcome to express-angularjs-typescript-sqlite-webpack API"));
      await PersonRoutes.routes(app);
    } catch (err) {
      throw err;
    }
  }
}
