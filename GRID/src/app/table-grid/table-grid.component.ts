import { Component, ViewChild } from '@angular/core';
import { DataServiceService, Employee } from '../Service/data-service.service';
import { DxDataGridComponent, DxDataGridModule, DxSelectBoxModule, DxCheckBoxModule } from 'devextreme-angular';


@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent
{
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  employees: Employee[];
  saleAmountHeaderFilter: any;
  applyFilterTypes: any;
  currentFilter: any;
  showFilterRow: boolean| null | undefined;
  showHeaderFilter: boolean| null | undefined;

  constructor(service: DataServiceService) {
      this.employees = service.getEmployees();
      console.log(this.employees);
      this.showFilterRow = true;
      this.showHeaderFilter = true;
      this.applyFilterTypes = [{
          key: "auto",
          name: "Immediately"
      }, {
          key: "onClick",
          name: "On Button Click"
      }];
      this.saleAmountHeaderFilter = [{
          text: "Less than $3000",
          value: ["SaleAmount", "<", 3000]
      }, {
          text: "$3000 - $5000",
          value: [
              ["SaleAmount", ">=", 3000],
              ["SaleAmount", "<", 5000]
          ]
      }, {
          text: "$5000 - $10000",
          value: [
              ["SaleAmount", ">=", 5000],
              ["SaleAmount", "<", 10000]
          ]
      }, {
          text: "$10000 - $20000",
          value: [
              ["SaleAmount", ">=", 10000],
              ["SaleAmount", "<", 20000]
          ]
      }, {
          text: "Greater than $20000",
          value: ["SaleAmount", ">=", 20000]
      }];
      this.currentFilter = this.applyFilterTypes[0].key;
      this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
  }

  private static getOrderDay(rowData:any) {
    return (new Date(rowData.OrderDate)).getDay();
}

calculateFilterExpression(value:any, selectedFilterOperations:any, target:any) {
    let column = this as any;
    if(target === "headerFilter" && value === "weekends")
    {
        return [[TableGridComponent.getOrderDay, "=", 0], "or", [TableGridComponent.getOrderDay, "=", 6]];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
}

orderHeaderFilter(data:any) {
    data.dataSource.postProcess = (results:any) => {
        results.push({
            text: "Weekends",
            value: "weekends"
        });
        return results;
    };
}

clearFilter() {
    this.dataGrid.instance.clearFilter();
}



  getDisplayExpr(item:any)
  {
      //console.log(item.FirstName + ' ' + item.LastName);
      //  return item && item.FirstName + ' ' + item.LastName;
  }

}
