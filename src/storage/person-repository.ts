import {Database} from "sqlite3";
import {Person} from "../models/Person";
import DB from "../config/sqlite-config";

export default class PersonRepository {

  public static async createTable(db: Database): Promise<Database> {
    const createPeopleTableSql = `
      CREATE TABLE IF NOT EXISTS people
      (
        id              INTEGER NOT NULL
                        CONSTRAINT people_pk
                        PRIMARY KEY AUTOINCREMENT,
        full_name       INTEGER NOT NULL,
        date_of_birth   TEXT    NOT NULL,
        email           TEXT    NOT NULL,
        num_of_children INTEGER DEFAULT 0 NOT NULL
      );

      CREATE UNIQUE INDEX people_id_uindex
      ON people (id);`;

    return db.run(createPeopleTableSql);
  }

  public static async getAll() {

    return await new DB()
      .all(
      `SELECT full_name, date_of_birth, email, num_of_children
            FROM people`);
  }

  public static async get(id: number) {

    return await new DB()
      .get(
      `SELECT full_name, date_of_birth, email, num_of_children
            FROM people
            WHERE id = ?`,
        [id]);
  }

  public static async create({full_name, date_of_birth, email, num_of_children}: Person) {

    return await new DB()
      .run(
      `INSERT INTO people(full_name, date_of_birth, email, num_of_children) VALUES (?,?,?,?)`,
      [full_name, date_of_birth, email, num_of_children]);
  }

  public static async update(id: number, {full_name, date_of_birth, email, num_of_children}: Person) {

    return await new DB()
      .run(
      `UPDATE people
            SET full_name = ?,
            date_of_birth = ?,
            email = ?,
            num_of_children = ?
            WHERE id = ?`,
      [id, full_name, num_of_children, email, date_of_birth]
    );
  }

  public static async delete(id: number) {

    return await new DB()
      .run(
      `DELETE FROM people
            WHERE id = ?`,
      [id]
    );
  }
}
