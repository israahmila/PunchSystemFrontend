import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListeUtilisationsComponent } from './liste/liste.component';

const routes: Routes = [
  { path: 'utilisations', component: ListeUtilisationsComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisationModule { }
