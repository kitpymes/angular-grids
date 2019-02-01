import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';

import 'ag-grid-enterprise';

import { HotelesComponent } from './ag-grids';
import { HttpFetchService, LocalStorageService } from './services';
import { MatSearchModule } from './ag-grids/components/search-input/mat-search.module';

@NgModule({
  declarations: [
    AppComponent,
    HotelesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    MatSearchModule,

    AgGridModule.withComponents([HotelesComponent])
  ],
  providers: [HttpFetchService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
