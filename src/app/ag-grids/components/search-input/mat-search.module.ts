import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSearchComponent } from './mat-search.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule
  ],
  exports: [MatSearchComponent],
  declarations: [MatSearchComponent]
})
export class MatSearchModule {}
