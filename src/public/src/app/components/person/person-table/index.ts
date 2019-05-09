import PersonTableComponent from "./person-table.component";

/* tslint:disable:max-line-length */
function tableSortConfig(tableSortConfigProvider: ng.tablesort.ITableSortConfigProvider) {
  let filterString = "<div class='panel-body'>";
  filterString += "<div class='col-sm-4 col-md-3' style='margin-bottom: 0; line-height: 3px; padding-left: 0;'>";
  filterString += "<div class='alert alert-info' style='margin-bottom: 0; line-height: 3px;'>";
  filterString += "<p>Filter Column: {{$ctrl.sort.name}}</p>";
  filterString += "</div>";
  filterString += "</div>";
  filterString += "<div class='col-sm-4 col-md-3 alert alert-info' style='margin-bottom: 0; line-height: 3px;'>";
  filterString += "<p>Order: {{$ctrl.sort.order ? 'DESC' : 'ASC'}}</p>";
  filterString += "</div>";
  filterString += "<div class='col-sm-4 col-md-3 pull-right' style='padding-right: 0;'>";
  filterString += "<div class='form-group has-feedback' style='margin-bottom: 0;'>";
  filterString += "<input type='search' class='form-control' placeholder='Filter {{ITEM_NAME_PLURAL}}' ng-model='FILTER_STRING'/>";
  filterString += "<span class='glyphicon glyphicon-search form-control-feedback' aria-hidden='true'></span>";
  filterString += "</div>";
  filterString += "</div>";
  filterString += "</div>";
  filterString += "</div>";
  tableSortConfigProvider.filterTemplate = filterString;

  let pagerString = "<div class='panel-footer'>";
  pagerString += "<div class='text-right'>";
  pagerString += "<small class='text-muted'>Showing {{CURRENT_PAGE_RANGE}} {{FILTERED_COUNT === 0 ? '' : 'of'}} ";
  pagerString += "<span ng-if='FILTERED_COUNT === TOTAL_COUNT'>{{TOTAL_COUNT | number}} {{TOTAL_COUNT === 1 ? ITEM_NAME_SINGULAR : ITEM_NAME_PLURAL}}</span>";
  pagerString += "<span ng-if='FILTERED_COUNT !== TOTAL_COUNT'>{{FILTERED_COUNT | number}} {{FILTERED_COUNT === 1 ? ITEM_NAME_SINGULAR : ITEM_NAME_PLURAL}} (filtered from {{TOTAL_COUNT | number}})</span>";
  pagerString += "</small>&nbsp;";
  pagerString += "<uib-pagination style='vertical-align:top; margin-top:0;' ng-if='ITEMS_PER_PAGE < TOTAL_COUNT' ng-model='CURRENT_PAGE_NUMBER' total-items='FILTERED_COUNT' items-per-page='ITEMS_PER_PAGE' max-size='5' force-ellipses='true'></uib-pagination>";
  pagerString += "&nbsp;";
  pagerString += "<div class='form-group' style='display:inline-block; margin-bottom: 0;'><select class='form-control' ng-model='ITEMS_PER_PAGE' ng-options='opt as (opt + \" per page\") for opt in PER_PAGE_OPTIONS'></select></div>";
  pagerString += "</div>";
  pagerString += "</div>";
  tableSortConfigProvider.paginationTemplate = pagerString;

  const paginationOptions = [5, 15, 50, 100];

  tableSortConfigProvider.perPageOptions = paginationOptions;

  tableSortConfigProvider.perPageDefault = paginationOptions[1];
}

const PersonTable: ng.IModule = angular
  .module("person.table", [])
  .component("personTable", new PersonTableComponent())
  .config(tableSortConfig);

export default PersonTable.name;
