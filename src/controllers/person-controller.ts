import {Request, Response} from "express";
import PersonRepository from "../storage/person-repository";
import {Person} from "../models/Person";

export default class PersonController {

  public static async getAllPeople(req: Request, res: Response) {
    res.json(await PersonRepository.getAll());
  }

  public static async addNewPerson(req: Request, res: Response) {
    PersonController.validatePerson(req.body.person);
    res.json(await PersonRepository.create(req.body.person));
  }

  public static async getPersonById(req: Request, res: Response) {
    res.json(await PersonRepository.get(req.body.person));
  }

  public static async updatePerson(req: Request, res: Response) {
    PersonController.validatePerson(req.body.person);
    res.json(await PersonRepository.update(req.body.person, req.body.id));
  }

  public static async deletePersonById(req: Request, res: Response) {
    res.json(await PersonRepository.delete(req.body.id));
  }

  // TODO replace this with JSON Schema for better validation
  private static validatePerson(candidatePerson: object): void {
    if (candidatePerson !instanceof Person) throw Error(`${candidatePerson} is not of type Person`);
  }
}
