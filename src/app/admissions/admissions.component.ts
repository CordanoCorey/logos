import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  isMobileSelector,
  routeParamSelector,
  SmartComponent,
  windowHeightSelector,
  windowWidthSelector,
} from '@caiu/library';
import { Store } from '@ngrx/store';
import { slideInLeftOnEnterAnimation } from 'angular-animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'logos-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.scss'],
  animations: [slideInLeftOnEnterAnimation()],
})
export class AdmissionsComponent
  extends SmartComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('logoEl') logoEl: ElementRef;
  _contentHeight = 0;
  _contentWidth = 0;
  contentHeight$: Observable<number>;
  contentWidth$: Observable<number>;
  isMobile = false;
  isMobile$: Observable<boolean>;
  logoTopPx = 0;
  view: 'tuition' | null = null;
  view$: Observable<string>;

  constructor(public store: Store<any>) {
    super(store);
    this.contentHeight$ = windowHeightSelector(store);
    this.contentWidth$ = windowWidthSelector(store);
    this.isMobile$ = isMobileSelector(store);
    this.view$ = routeParamSelector(store, 'view');
  }

  set contentHeight(value: number) {
    this._contentHeight = value;
    setTimeout(() => {
      this.logoTopPx = this.contentHeight / 2 - this.logoElHeightPx / 2;
    }, 0);
  }

  get contentHeight(): number {
    return this._contentHeight;
  }

  set contentWidth(value: number) {
    this._contentWidth = value;
  }

  get contentWidth(): number {
    return this._contentWidth;
  }

  get logoElHeightPx(): number {
    return this.logoEl ? this.logoEl.nativeElement.clientHeight : 0;
  }

  ngOnInit(): void {
    this.sync(['contentHeight', 'contentWidth', 'isMobile', 'view']);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.logoTopPx = this.contentHeight / 2 - this.logoElHeightPx / 2;
    }, 0);
  }
}
