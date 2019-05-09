import sqlite3 = require("sqlite3");
import {Database} from "sqlite3";
import PersonRepository from "../storage/person-repository";
import {defaultDbUri} from "../app";

export default class DB {

  public db: Database;

  constructor(dbUri: string = defaultDbUri) {
    this.db = new sqlite3.Database(dbUri, (err) => {
      if (err) throw err;
    });
  }

  public async createTables() {
    await PersonRepository.createTable(this.db);
  }

  public async run2(sql: string, params: any[] = []) {
    return await this.db.run(sql, params, function(err) {
      if (err) throw err;
      return { id: this.lastID };
      });
  }

  public async get2(sql: string, params: any[] = []) {
    return await this.db.get(sql, params, function(err, result) {
      if (err) throw err;
      return result;
      });
  }

  public async all2(sql: string, params: any[] = []) {
    try {
      return await this.db.all(sql, params, function(err, rows) {
        if (err) throw err;
        return rows;
      });
    } catch (err) {
      throw err;
    }
  }

  public run(sql: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  public get(sql: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err)
        } else {
          resolve(result)
        }
      });
    });
  }

  public all(sql: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
