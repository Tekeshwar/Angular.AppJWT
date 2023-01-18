import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiCallingComponent } from './api-calling/api-calling.component';

const routes: Routes = [
  {path:"login", component: ApiCallingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
