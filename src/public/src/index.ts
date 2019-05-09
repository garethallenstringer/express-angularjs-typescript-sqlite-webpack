import "angular";
import "angular-animate";
import "angular-messages";
import "angular-tablesort";
import "angular-tablesort/tablesort.css";
import "angular-ui-bootstrap";
import "angular-ui-bootstrap/src/datepickerPopup";
import "bootstrap/dist/css/bootstrap.min.css";
import {AppComponent} from "./app/app.component";
import Components from "./app/components";
import {PersonService} from "./app/services/person/person.service";

const App: ng.IModule = angular
  .module("app", ["ngAnimate", "ngMessages", "tableSort", "ui.bootstrap.module.datepickerPopup", Components])
  .service("personService", ["$http", PersonService])
  .component("app", new AppComponent());

// angular.bootstrap(document, ["app"], {strictDi: true});

export default App.name;
