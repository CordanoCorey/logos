import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMobileComponent } from './home-mobile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeMobileComponent,
    data: { routeName: 'home-mobile', routeLabel: 'Home' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeMobileRoutingModule {}
