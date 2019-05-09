import {Person} from "../../../../../../models/Person";
import {PersonService} from "../../../services/person/person.service";

export default class PersonFormComponent implements ng.IComponentOptions {
  public template = require("./person-form.component.html");
  public controller = PersonFormController;
}

export class PersonFormController implements ng.IComponentController {

  public dateOptions = {
    formatYear: "yy",
    maxDate: new Date(),
    startingDay: 1
  };
  public dateFormat = "dd-MM-yyyy";

  public popup = {
    opened: false
  };

  public candidatePerson: Person = {
    full_name: "",
    date_of_birth: new Date(),
    email: "",
    num_of_children: 0
  };

  public service: PersonService;

  /* @ngInject */
  constructor(private personService: PersonService) {
    this.service = personService;
  }

  public submitPerson(personForm: ng.IFormController) {
    this.resetForm(personForm);
    this.personService.tableLoading = true;
    this.personService
      .addNewPerson(this.candidatePerson)
      .then(() => this.personService.reloadAllPeople());
  }

  public resetForm(personForm: ng.IFormController) {
    personForm.$setPristine();
    personForm.$setUntouched();
    this.candidatePerson = {
      full_name: "",
        date_of_birth: new Date(),
      email: "",
      num_of_children: 0
    };
  }

  public openPopup() {
    this.popup.opened = true;
  }
}
