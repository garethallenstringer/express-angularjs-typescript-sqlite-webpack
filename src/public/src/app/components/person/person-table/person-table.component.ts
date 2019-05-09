import {PersonService} from "../../../services/person/person.service";

export default class PersonTableComponent implements ng.IComponentOptions {
  public template: string;
  public controller: ng.IControllerConstructor;

  constructor() {
    this.template = require("./person-table.component.html");
    this.controller = PersonTableController;
  }
}

export class PersonTableController implements ng.IComponentController {

  public sort = {};
  public service: PersonService;

  /* @ngInject */
  constructor(private $scope: ng.IScope, private personService: PersonService) {
    $scope.$on("tablesort:sortOrder", (event, sortOrder) => this.sort = sortOrder[0]);
    this.service = personService;
    personService.reloadAllPeople();
  }
}
