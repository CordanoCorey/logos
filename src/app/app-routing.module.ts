import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BeliefsComponent } from './shared/beliefs/beliefs.component';
import { MissionComponent } from './shared/mission/mission.component';
import { MobileNotSupportedComponent } from './shared/mobile-not-supported/mobile-not-supported.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'about' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'mobile-not-supported',
        component: MobileNotSupportedComponent,
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about-us/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path: 'academics',
        loadChildren: () =>
          import('./academics/academics.module').then((m) => m.AcademicsModule),
      },
      {
        path: 'admissions',
        loadChildren: () =>
          import('./admissions/admissions.module').then(
            (m) => m.AdmissionsModule
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact-us/contact-us.module').then(
            (m) => m.ContactUsModule
          ),
      },
      {
        path: 'mission',
        component: MissionComponent,
      },
      {
        path: 'beliefs',
        component: BeliefsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
