import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionsComponent } from './admissions.component';

const routes: Routes = [{
  path: '',
  component: AdmissionsComponent,
  data: { routeName: 'admissions', routeLabel: 'Admissions' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionsRoutingModule { }
