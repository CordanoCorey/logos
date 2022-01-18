import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicsComponent } from './academics.component';

const routes: Routes = [
  {
    path: '',
    component: AcademicsComponent,
    data: { routeName: 'academics', routeLabel: 'Academics' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicsRoutingModule {}
