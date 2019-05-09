import {Person} from "../../../../../models/Person";

export class PersonService {

  public allPeople: Person[] = [];
  public tableLoading: boolean = true;

  /* @ngInject */
  constructor(private $http: ng.IHttpService) {
    this.reloadAllPeople();
  }

  public reloadAllPeople() {
    return this.$http.get<Person[]>(`api/people`)
      .then((response) => this.allPeople = response.data)
      .finally(() => this.tableLoading = false);
  }

  public addNewPerson(person: Person): ng.IHttpPromise<{id: number}> {
    return this.$http.post(`api/people`, {person});
  }
}
