import angular from "angular";
import PersonModule from "./person";

const ComponentsModule: ng.IModule = angular
  .module("app.components", [
    PersonModule,
  ]);

export default ComponentsModule.name;
