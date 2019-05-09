import PersonFormComponent from "./person-form/person-form.component";
import PersonTable from "./person-table";

const PersonModule: ng.IModule = angular
  .module("components.person", [PersonTable])
  .component("personForm", new PersonFormComponent());

export default PersonModule.name;
