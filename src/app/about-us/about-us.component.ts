import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  routeParamSelector,
  SmartComponent,
  isMobileSelector,
  windowHeightSelector,
  windowWidthSelector,
} from '@caiu/library';
import { Store } from '@ngrx/store';
import { slideInLeftOnEnterAnimation } from 'angular-animations';
import { BehaviorSubject, Observable } from 'rxjs';
import { MissionComponent } from '../shared/mission/mission.component';
import { BeliefsComponent } from '../shared/beliefs/beliefs.component';
import { VisionComponent } from '../shared/vision/vision.component';
import { FaqsComponent } from '../shared/faqs/faqs.component';

@Component({
  selector: 'logos-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  animations: [slideInLeftOnEnterAnimation()],
})
export class AboutUsComponent
  extends SmartComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('scrollable') scrollableEl: ElementRef;
  @ViewChild('logoEl') logoEl: ElementRef;
  @ViewChild(MissionComponent) missionCmpt: MissionComponent;
  @ViewChild(BeliefsComponent) beliefsCmpt: BeliefsComponent;
  @ViewChild(VisionComponent) visionCmpt: VisionComponent;
  @ViewChild(FaqsComponent) faqsCmpt: FaqsComponent;
  contentHeight$: Observable<number>;
  contentWidth$: Observable<number>;
  contentHeightSubject = new BehaviorSubject<number>(0);
  contentWidthSubject = new BehaviorSubject<number>(0);
  isMobile = false;
  isMobile$: Observable<boolean>;
  logoTopPx = 0;
  _view: 'beliefs' | 'faqs' | 'mission' | 'vision' | null = null;
  view$: Observable<string>;

  constructor(public store: Store<any>, public el: ElementRef) {
    super(store);
    this.isMobile$ = isMobileSelector(store);
    this.view$ = routeParamSelector(store, 'view');
    this.contentHeight$ = windowHeightSelector(store);
    this.contentWidth$ = windowWidthSelector(store);
  }

  get beliefsCmptTop(): number {
    return this.beliefsCmpt ? this.beliefsCmpt.el.nativeElement.offsetTop : 0;
  }

  set contentHeight(value: number) {
    this.contentHeightSubject.next(value);
    setTimeout(() => {
      this.logoTopPx = this.contentHeight / 2 - this.logoElHeightPx / 2;
    }, 0);
  }

  get contentHeight(): number {
    return this.contentHeightSubject.value;
  }

  set contentWidth(value: number) {
    this.contentWidthSubject.next(value);
  }

  get contentWidth(): number {
    return this.contentWidthSubject.value;
  }

  get faqsCmptTop(): number {
    return this.faqsCmpt ? this.faqsCmpt.el.nativeElement.offsetTop : 0;
  }

  get logoElHeightPx(): number {
    return this.logoEl ? this.logoEl.nativeElement.clientHeight : 0;
  }

  get missionCmptTop(): number {
    return this.missionCmpt ? this.missionCmpt.el.nativeElement.offsetTop : 0;
  }

  set view(value: 'beliefs' | 'faqs' | 'mission' | 'vision' | null) {
    this._view = value;
    this.scrollTo(value);
  }

  get view(): 'beliefs' | 'faqs' | 'mission' | 'vision' | null {
    return this._view;
  }

  get visionCmptTop(): number {
    return this.visionCmpt ? this.visionCmpt.el.nativeElement.offsetTop : 0;
  }

  ngOnInit(): void {
    this.sync(['isMobile', 'view']);
  }

  ngAfterViewInit() {
    this.scrollTo(this.view);
    setTimeout(() => {
      this.contentHeight = this.el.nativeElement.offsetHeight;
      this.contentWidth = this.el.nativeElement.offsetWidth;
    }, 0);

    setTimeout(() => {
      this.logoTopPx = this.contentHeight / 2 - this.logoElHeightPx / 2;
    }, 0);
  }

  scrollTo(view: 'beliefs' | 'faqs' | 'mission' | 'vision' | null) {
    setTimeout(() => {
      if (this.scrollableEl) {
        switch (view) {
          case 'beliefs':
            if (
              this.scrollableEl.nativeElement.scrollTop !==
              Math.max(this.beliefsCmptTop - 130, 0)
            ) {
              this.scrollableEl.nativeElement.scrollTop = Math.max(
                this.beliefsCmptTop - 130,
                0
              );
            }
            break;
          case 'faqs':
            if (
              this.scrollableEl.nativeElement.scrollTop !==
              Math.max(this.faqsCmptTop - 130, 0)
            ) {
              this.scrollableEl.nativeElement.scrollTop = Math.max(
                this.faqsCmptTop - 130,
                0
              );
            }
            break;
          case 'mission':
            if (
              this.scrollableEl.nativeElement.scrollTop !==
              Math.max(this.missionCmptTop - 130, 0)
            ) {
              this.scrollableEl.nativeElement.scrollTop = Math.max(
                this.missionCmptTop - 130,
                0
              );
            }
            break;
          case 'vision':
            if (
              this.scrollableEl.nativeElement.scrollTop !==
              Math.max(this.visionCmptTop - 130, 0)
            ) {
              this.scrollableEl.nativeElement.scrollTop = Math.max(
                this.visionCmptTop - 130,
                0
              );
            }
            break;
          default:
            if (this.scrollableEl.nativeElement.scrollTop !== 0) {
              this.scrollableEl.nativeElement.scrollTop = 0;
            }
            break;
        }
      }
    }, 0);
  }
}
