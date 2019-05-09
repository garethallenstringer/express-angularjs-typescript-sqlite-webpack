import {Application} from "express";
import PersonController from "../controllers/person-controller";

export default class PersonRoutes {

  public static async routes(app: Application): Promise<void> {

    app.route("/api/people")
      .get(   await PersonController.getAllPeople)
      .post(  await PersonController.addNewPerson);

    app.route("/api/people/:personId")
      .get(   await PersonController.getPersonById)
      .put(   await PersonController.updatePerson)
      .delete(await PersonController.deletePersonById);
  }
}
