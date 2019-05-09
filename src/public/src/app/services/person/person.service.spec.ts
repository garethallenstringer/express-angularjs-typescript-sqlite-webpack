/* tslint:disable:variable-name */
import "angular-mocks";
import "karma";
import {mockPeople} from "../../mocks/person/person.mock";
import {PersonService} from "./person.service";

describe("PersonService", () => {

  let personService: PersonService;
  let $httpBackend: ng.IHttpBackendService;

  const PeopleUrl = "/api/people";

  beforeEach(angular.mock.module("app"));
  beforeEach(angular.mock.inject((_personService_: PersonService, _$httpBackend_: ng.IHttpBackendService) => {
    personService = _personService_;
    $httpBackend = _$httpBackend_;
  }));

  it("should initialize correctly", () => {
    expect(personService).toBeDefined();
    expect(personService.tableLoading).toBeTruthy();
  });

  describe("reloadAllPeople", () => {
    it("should assign allPeople to the response", () => {
      $httpBackend.expectGET(PeopleUrl).respond(mockPeople);

      personService
        .reloadAllPeople()
        .then((response) => expect(personService.allPeople).toEqual(response));
    });

    it("should assign allPeople to the response", () => {
      $httpBackend.expectGET(PeopleUrl).respond(mockPeople);

      personService
        .reloadAllPeople()
        .finally(() => expect(personService.tableLoading).toBeFalsy());
    });
  });

  describe("addNewPerson", () => {
    it("should return the new id of the added person", () => {
      $httpBackend.expectPOST(PeopleUrl, {person: mockPeople[0]}).respond({id: 1});

      personService
        .addNewPerson(mockPeople[0])
        .then((response) => expect(response.data).toEqual({id: 1}));
    });
  });
});
