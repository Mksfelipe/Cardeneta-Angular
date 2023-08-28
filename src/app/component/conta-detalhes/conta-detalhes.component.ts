import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { PurchaseSaveDialogComponent } from '../purchase-save-dialog/purchase-save-dialog.component';

@Component({
  selector: 'app-conta-detalhes',
  templateUrl: './conta-detalhes.component.html',
  styleUrls: ['./conta-detalhes.component.css']
})
export class ContaDetalhesComponent implements OnInit{
  
  account!: Account;
  accountId: number = 0;
  
  constructor(private route: ActivatedRoute, private accountService: AccountService){ }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.accountId = Number(params.get('id'));
      
      this.getAccountById(this.accountId);
      
    });
  }
  

  getAccountById(id: number) {
    this.accountService.getAccounById(id).subscribe(
      data => {
        this.account = data;
      }
    )
  }
}
