import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxDataGridModule, DxCheckBoxModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataServiceService } from './Service/data-service.service';
import { TableGridComponent } from './table-grid/table-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    TableGridComponent
  ],
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    AppRoutingModule

  ],
  providers: [DataServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
