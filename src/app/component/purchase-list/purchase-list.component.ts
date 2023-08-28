import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Purchase } from 'src/app/models/purchased';
import { PurchaseService } from 'src/app/services/purchase.service';
import { PurchaseSaveDialogComponent } from '../purchase-save-dialog/purchase-save-dialog.component';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ContaDetalhesComponent } from '../conta-detalhes/conta-detalhes.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  response: any;

  size: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  number: number = 0;
  page: number = 0;

  @Input()
  accountId?: number

  value = { price: 0 };

  constructor(private purchaseService: PurchaseService, private dialog: MatDialog, private accountComponent: ContaDetalhesComponent) { }

  ngOnInit(): void {
    this.getPurchasedByAccoundId();
  }

  dataSource = new MatTableDataSource<Purchase>();

  displayedColumns = ['criado', 'valor', 'status'];

  async getPurchasedByAccoundId() {
    await this.purchaseService.getPurchaseByAccoundId(this.accountId!, this.page)
      .subscribe((data: any) => {
        this.response = data;
        this.dataSource = this.response.content;

        this.number = this.response.number;
        this.size = this.response.size;
        this.totalElements = this.response.totalElements;
        this.totalPages = this.response.totalPages;
      });
  }

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.getPurchasedByAccoundId();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(PurchaseSaveDialogComponent, {
      width: '250px',
      data: { value: this.value.price }

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result)
      this.addPurchased(result);
    });
  }

  addPurchased(dataInput: any) {
    this.value.price = dataInput;
    this.purchaseService.createPurchase(this.accountId!, this.value).subscribe((data: {}) => {
      this.getPurchasedByAccoundId();
      this.accountComponent.getAccountById(this.accountId!);
    });
  }
}
