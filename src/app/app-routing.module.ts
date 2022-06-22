import { NgModule, Injectable } from '@angular/core';
import {
  Routes,
  RouterModule,
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { isMobileSelector } from '@caiu/library';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BeliefsComponent } from './shared/beliefs/beliefs.component';
import { MissionComponent } from './shared/mission/mission.component';
import { MobileNotSupportedComponent } from './shared/mobile-not-supported/mobile-not-supported.component';

@Injectable({
  providedIn: 'root',
})
export class MobileGuard implements CanActivate {
  isMobile = false;
  isMobile$: Observable<boolean>;
  constructor(private store: Store<any>, private router: Router) {
    isMobileSelector(store).subscribe((x) => {
      this.isMobile = x;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    if (this.isMobile) {
      this.router.navigate(['/home/mobile']);
      return false;
    }
    return true;
  }
}

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        canActivate: [MobileGuard],
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'home/mobile',
        loadChildren: () =>
          import('./home-mobile/home-mobile.module').then(
            (m) => m.HomeMobileModule
          ),
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
        path: 'events',
        loadChildren: () =>
          import('./events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'links',
        loadChildren: () =>
          import('./links/links.module').then((m) => m.LinksModule),
      },

      {
        path: 'donate',
        loadChildren: () => import('./pay/pay.module').then((m) => m.PayModule),
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
  providers: [MobileGuard],
})
export class AppRoutingModule {}
