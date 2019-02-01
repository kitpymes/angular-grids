import * as agGrid from 'ag-grid-community';

export default class GridBase {
  protected editingRowIndex;
  private gridDiv: HTMLElement;
  private searchInput: HTMLInputElement;
  protected gridApi: agGrid.GridApi;
  protected gridColumnApi: agGrid.ColumnApi;
  protected gridOptions: agGrid.GridOptions;

  constructor(gridId: string, gridOptions: agGrid.GridOptions, filterId?: string) {
    this.gridDiv = document.querySelector(gridId);
    this.gridOptions = gridOptions;

    const grid = new agGrid.Grid(this.gridDiv, this.gridOptions);

    if (filterId) {
      this.searchInput = document.querySelector(filterId);
      this.searchInput.oninput = (event: Event) => this.gridOptions.api.setQuickFilter(this.searchInput.value);
    }
  }
}
