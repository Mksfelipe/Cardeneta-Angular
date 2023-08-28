import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './component/login/login.component'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './http-interceptors';
import { HomeComponent } from './component/home/home.component';
import { ClientListComponent } from './component/client-list/client-list.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { ContaDetalhesComponent } from './component/conta-detalhes/conta-detalhes.component';
import { CdkTableModule } from '@angular/cdk/table';
import { PurchaseListComponent } from './component/purchase-list/purchase-list.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PurchaseSaveDialogComponent } from './component/purchase-save-dialog/purchase-save-dialog.component';
import { ReplaceUnderscorePipe } from './util/ReplaceUnderscorePipe';
import { ReplacePipe } from './util/ReplacePipe';
import { FormSaveClientComponent } from './component/form-save-client/form-save-client.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ClientListComponent,
    ContaDetalhesComponent,
    PurchaseListComponent,
    PurchaseSaveDialogComponent,
    ReplaceUnderscorePipe,
    ReplacePipe, FormSaveClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
