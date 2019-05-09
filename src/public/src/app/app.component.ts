export class AppComponent implements ng.IComponentOptions {
  public template: string;
  public controller: ng.IControllerConstructor;

  constructor() {
    this.template = require("./app.component.html");
    this.controller = AppController;
  }
}

export class AppController implements ng.IComponentController {
  public title = "express-angularjs-typescript-sqlite-webpack App";
}
