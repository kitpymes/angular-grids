import * as agGrid from 'ag-grid-community';
import 'ag-grid-enterprise';


import GridBase from '../grid.base';
import { HttpFetchService } from '../../services/http.fetch.service';

export default class OlympicGrid extends GridBase {
  private http: HttpFetchService;

  constructor(gridId: string, filterId?: string) {
    super(gridId,
      {
        rowSelection: 'multiple',
        groupSelectsChildren: true,
        groupSelectsFiltered: true,
        suppressAggFuncInHeader: true,
        enableSorting: true,
        enableFilter: true,
        enableColResize: true,
        colResizeDefault: 'shift',
        animateRows: true,
        suppressRowClickSelection: true,
        autoGroupColumnDef: {headerName: 'Athlete', field: 'athlete', width: 200,
            cellRenderer: 'agGroupCellRenderer',
            cellRendererParams: {
                checkbox: true
            }
        },
        onGridReady: (event: agGrid.GridReadyEvent): void => {
          this.gridApi = event.api;
          this.gridColumnApi = event.columnApi;
          this.gridApi.setColumnDefs(this.columns);
          this.loadRows();

          this.gridApi.sizeColumnsToFit();
          window.onresize = () => {
            this.gridApi.sizeColumnsToFit();
          };
        }
      },
      filterId
    );

    this.http = new HttpFetchService();
  }

  private loadRows(): void {
    const url = 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json';

    this.http.getJson(url).then((response) => {
      this.gridApi.setRowData(response);
    }).catch(error => console.warn(error));
  }

  private get columns(): agGrid.ColDef[] {
    return [
      {headerName: 'Country', field: 'country', rowGroupIndex: 0},
      {headerName: 'Sport', field: 'sport', rowGroupIndex: 1},
      {headerName: 'Age', field: 'age', aggFunc: 'sum'},
      {headerName: 'Year', field: 'year'},
      {headerName: 'Date', field: 'date'},
      {headerName: 'Gold', field: 'gold', aggFunc: 'sum'},
      {headerName: 'Silver', field: 'silver', aggFunc: 'sum'},
      {headerName: 'Bronze', field: 'bronze', aggFunc: 'sum'},
      {headerName: 'Total', field: 'total', aggFunc: 'sum'}
    ];
  }
}
