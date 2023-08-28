import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';

import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {


  clients$: Observable<Client[]> = this.clientService.clients$;

  displayedColumns = ['id', 'firstName', 'lastName', 'cpf', 'acoes'];
  response: any;

  size: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  number: number = 0;
  page: number = 0;

  searchTerm!: string;

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.getClientes();
  }

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    if (this.searchTerm.trim() != '' && this.searchTerm.length >= 4){
      this.search()
    } else {
      this.getClientes();
    }
  }

  getClientes() {
    this.clientService.getClients(this.page)
      .subscribe(data => {
        this.response = data;
        this.clients$ = this.response.content;

        this.number = this.response.number;
        this.size = this.response.size;
        this.totalElements = this.response.totalElements;
        this.totalPages = this.response.totalPages;

      });
  }

  search() {
    if (this.searchTerm.trim() != '' && this.searchTerm.length >= 4) {
      this.clientService.searchByName(this.searchTerm, this.page)
      .subscribe(data => {
        this.response = data;
        this.clients$ = this.response.content;

        this.number = this.response.number;
        this.size = this.response.size;
        this.totalElements = this.response.totalElements;
        this.totalPages = this.response.totalPages;

      });
    } 
  }
}
