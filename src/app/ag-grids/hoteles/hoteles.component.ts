import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AgGridNg2 } from 'ag-grid-angular';
import { GridReadyEvent, CellClickedEvent, CellValueChangedEvent } from 'ag-grid-community';

import { LocalStorageService } from '../../services/local.storage.service';
import HotelesDB from './hoteles.data.json';
import { IHotel } from './hoteles.model';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.scss']
})
export class HotelesComponent implements OnInit {
  searchValue = '';
  @ViewChild('hotelesGrid') hotelesGrid: AgGridNg2;
  private localStorageService: LocalStorageService<IHotel>;

  constructor(private http: HttpClient) {
    this.localStorageService = new LocalStorageService<IHotel>(HotelesDB);
  }

  ngOnInit() {
    this.hotelesGrid.gridOptions = {
      defaultColDef: {
        editable: true,
        filter: true
      },
      columnTypes: {
        valueColumn: {
          aggFunc: 'sum',
          cellClass: 'number-cell',
          cellEditor: 'agRichSelectCellEditor',
          cellRenderer: 'agAnimateShowChangeCellRenderer',
          filter: 'agNumberColumnFilter',
          cellEditorParams: {
            values: [0, 1, 2, 3]
          }
        },
        totalColumn: {
          filter: 'agNumberColumnFilter',
          cellRenderer: 'agAnimateShowChangeCellRenderer',
          cellClass: 'number-cell total-col'
        }
      },
      floatingFilter: true,
      groupDefaultExpanded: 1,
      suppressAggFuncInHeader: true,
      enableCellChangeFlash: true,
      enableSorting: true,
      enableFilter: true,
      enableColResize: true,
      colResizeDefault: 'shift',
      animateRows: true,
      getRowStyle: (event: any) => {
        /*if (event.node.rowIndex % 2 === 0) {
          return { background: '#e1e4ea' };
        }*/
      },
      onGridReady: (event: GridReadyEvent): void => {
        // this.hotelesGrid.api = event.api;
        // this.hotelesGrid.columnApi = event.columnApi;
        this.hotelesGrid.api.setColumnDefs(this.columns);
        this.hotelesGrid.api.setRowData(this.rows);
        this.hotelesGrid.api.setSortModel([{ colId: 'total', sort: 'desc' }]);
        this.hotelesGrid.api.sizeColumnsToFit();
        window.onresize = () => this.hotelesGrid.api.sizeColumnsToFit();
      },
      onCellClicked: (event: CellClickedEvent): void => {
      /* if(this.editingRowIndex != event.rowIndex) {
          console.error(event);
          event.api.startEditingCell({
            rowIndex: event.rowIndex,
            colKey: event.column.getColId()
          });
          this.editingRowIndex = event.rowIndex;
        }*/
      },
      onCellValueChanged: (event: CellValueChangedEvent): void => {
      /* console.error("parmas => \n\n\n", params);
        var colId = event.column.getId();
        if (colId === 'habitacion') {
          var habitacionValue =  event.data.habitacion;
          var wifiValue = event.data.wifi;
          event.node.setDataValue('wifi', null);
        }
        */
      }
    };
  }

  private get rows(): any[] {
    const response = this.localStorageService.getAll();
    return response;
  }

  private get columns(): any[] {
    return [
      { field: 'id', hide: true },
      { headerName: 'Nombre', field: 'nombre', editable: false, filter: 'agTextColumnFilter' },
      { headerName: 'Habitacion', field: 'habitacion', type: 'valueColumn' },
      { headerName: 'WiFi', field: 'wifi', type: 'valueColumn' },
      { headerName: 'Piscina', field: 'piscina', type: 'valueColumn' },
      { headerName: 'Ubicación', field: 'ubicacion', type: 'valueColumn' },
      { headerName: 'Parking', field: 'parking', type: 'valueColumn' },
      { headerName: 'Gym', field: 'gym', type: 'valueColumn' },
      { headerName: 'Actividades', field: 'actividades', type: 'valueColumn' },
      { headerName: 'Total', field: 'total', type: 'totalColumn', valueGetter: function aPlusBValueGetter(params) {
            return params.data.habitacion +
              params.data.wifi +
              params.data.piscina +
              params.data.ubicacion +
              params.data.parking +
              params.data.actividades +
              params.data.gym;
        }
      }
    ];
  }

  onSearchChange() {
    this.hotelesGrid.api.setQuickFilter(this.searchValue);
  }
}
