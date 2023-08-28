import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ClientListComponent } from './component/client-list/client-list.component';
import { AuthGuard } from './shared/auth.service';
import { ContaDetalhesComponent } from './component/conta-detalhes/conta-detalhes.component';
import { PurchaseListComponent } from './component/purchase-list/purchase-list.component';
import { PurchaseSaveDialogComponent } from './component/purchase-save-dialog/purchase-save-dialog.component';
import { FormSaveClientComponent } from './component/form-save-client/form-save-client.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ClientListComponent, runGuardsAndResolvers: 'always' }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ], 
  },

  {
    path: 'account/:id', component: ContaDetalhesComponent,
    children: [
      {path: 'details', component: PurchaseSaveDialogComponent},
      {path: 'list', component: PurchaseListComponent}
    ], canActivate: [AuthGuard]
  },

  {
    path: 'cadastrar', component: FormSaveClientComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
