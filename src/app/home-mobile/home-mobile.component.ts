import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger,
  AnimationEvent,
  query,
  stagger,
  state,
  group,
} from '@angular/animations';
import {
  build,
  falsy,
  RouterActions,
  routeParamSelector,
  SmartComponent,
  toArray,
  windowWidthSelector,
} from '@caiu/library';
import {
  lightSpeedInAnimation,
  fadeInRightBigOnEnterAnimation,
  fadeInLeftBigOnEnterAnimation,
  rollInOnEnterAnimation,
  rotateInDownLeftOnEnterAnimation,
  rotateInUpRightOnEnterAnimation,
  bounceAnimation,
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  zoomInOnEnterAnimation,
  zoomOutOnLeaveAnimation,
  pulseOnEnterAnimation,
  rotateInOnEnterAnimation,
  rotateOutOnLeaveAnimation,
  zoomInLeftOnEnterAnimation,
  zoomInRightOnEnterAnimation,
  fadeOutLeftBigOnLeaveAnimation,
  fadeOutRightBigOnLeaveAnimation,
} from 'angular-animations';
import { Store } from '@ngrx/store';
import { filter, throwIfEmpty } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  Dove,
  Quote,
  View,
  ABOUT_SUBMENU,
  ACADEMICS_SUBMENU,
  ADMISSIONS_SUBMENU,
  CONTACT_SUBMENU,
  MISSION_VIEWS,
  Citation,
} from '../shared/models';
import { isMobile } from '../shared/utils';

@Component({
  selector: 'logos-home-mobile',
  templateUrl: './home-mobile.component.html',
  styleUrls: ['./home-mobile.component.scss'],
  animations: [
    bounceAnimation(),
    rotateInDownLeftOnEnterAnimation(),
    rotateInUpRightOnEnterAnimation(),
    rollInOnEnterAnimation(),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    fadeInLeftBigOnEnterAnimation(),
    fadeOutLeftBigOnLeaveAnimation(),
    fadeInRightBigOnEnterAnimation(),
    fadeOutRightBigOnLeaveAnimation(),
    lightSpeedInAnimation(),
    pulseOnEnterAnimation(),
    rotateInOnEnterAnimation(),
    rotateOutOnLeaveAnimation(),
    zoomInOnEnterAnimation(),
    zoomOutOnLeaveAnimation(),
    zoomInLeftOnEnterAnimation(),
    zoomInRightOnEnterAnimation(),
    trigger('intoView', [
      transition(':enter', [
        style({ width: '3000px', opacity: 1, zIndex: 9 }),
        animate(
          '2000ms ease-out',
          style({ width: '300px', opacity: 0.9, zIndex: -1 })
        ),
      ]),
    ]),
    trigger('copyAndShrink', [
      transition(':enter', [
        query('.logo-mini', [
          style({ width: '300px', opacity: '0.2' }),
          group([animate('1000ms', style({ width: '100px', opacity: '1' }))]),
        ]),
      ]),
    ]),
    trigger('collapse', [
      state(
        'opened',
        style({
          height: '*',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
        })
      ),
      transition('opened => closed', animate('500ms ease-out')),
    ]),
    trigger('flyToTop', [
      state(
        'start',
        style({
          opacity: '0.2',
          width: '300px',
          top: '*',
          left: '*',
        })
      ),
      state(
        'end',
        style({
          opacity: '1',
          width: '100px',
          top: '5px',
          left: '10px',
        })
      ),
      transition('start => end', animate('5000ms ease-out')),
    ]),
  ],
})
export class HomeMobileComponent
  extends SmartComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('scrollable') scrollable: ElementRef;
  @ViewChildren('stretchyEl') stretchyEl: QueryList<ElementRef>;
  @ViewChild('schoolName') schoolNameEl: ElementRef | undefined = undefined;
  accsCceCitation = build(Citation, {
    externalLink: 'https://classicalchristian.org/what-is-cce/',
    via: 'from the ACCS website',
  });
  _activeViewIndex = 0;
  arrowAnimationState = false;
  backgroundImage = '';
  backgroundImageDefault = 'images/11.jpg';
  _belowFoldTop = 0;
  belowFoldYPct = 0;
  chartOverlay: string | null = null;
  chartWidthPx = 0;
  contentHeightSubject = new BehaviorSubject<number>(0);
  contentWidthSubject = new BehaviorSubject<number>(0);
  hasOverlay = false;
  logoImageFinished = false;
  logosCopied = false;
  logoCopies: Dove[] = [];
  logoLeftPx = 0;
  logoTopPx = 0;
  logoHWRatio = 4477 / 5487;
  manualScroll = false;
  missionStartTop = 0;
  preloadedImages: any[] = [];
  schoolNameFontSize = 54;
  schoolNameLeft: number | null = null;
  schoolNameTop: number | null = null;
  scrollingDirection: 'DOWN' | 'UP' | null = null;
  _scrollY = 0;
  scrollToView = null;
  scrollToView$: Observable<string>;
  sidenavOpened = false;
  timeIncrement = 10;
  totalImages = 0;
  totalTime = 2000;
  x0 = 0;
  y0 = 0;
  aboutUsSubmenu = ABOUT_SUBMENU;
  academicsSubmenu = ACADEMICS_SUBMENU;
  admissionsSubmenu = ADMISSIONS_SUBMENU;
  contactUsSubmenu = CONTACT_SUBMENU;
  timer1 = 0;
  interval1;
  timer2 = 0;
  interval2;
  _views = MISSION_VIEWS;
  _windowHeight = 0;
  windowWidth = 0;

  constructor(public store: Store<any>, public el: ElementRef) {
    super(store);
    this.scrollToView$ = routeParamSelector(store, 'scrollTo');
    this.addSubscription(
      this.scrollToView$.subscribe((x) => {
        this.scrollToView = x;
        if (x) {
          // this.hasOverlay = true;
          this.goToView(x);
        }
      })
    );
    this.addSubscription(
      combineLatest([
        this.contentHeightSubject.asObservable().pipe(filter((x) => x > 0)),
        this.contentWidthSubject.asObservable().pipe(filter((x) => x > 0)),
      ]).subscribe((x) => {
        this.resetStickyStartPositions();
      })
    );
    this.addSubscription(
      windowWidthSelector(store).subscribe((x) => {
        this.windowWidth = x;
        this.chartWidthPx = x * 0.9 * 0.9;
      })
    );
  }

  set activeViewIndex(value: number) {
    if (value !== this._activeViewIndex) {
      this._activeViewIndex = Math.max(
        value < this.views.length ? value : -1,
        -1
      );
      if (this._activeViewIndex === -1 && falsy(this.backgroundImage)) {
        this.backgroundImage = this.backgroundImageDefault;
      } else if (
        this._activeViewIndex !== -1 &&
        this.backgroundImage === this.backgroundImageDefault
      ) {
        this.backgroundImage = '';
      }
    }
  }

  get activeViewIndex(): number {
    return this.scrollY < this.contentHeight + this.missionStartTop
      ? -1
      : this._activeViewIndex;
  }

  get atBottom(): boolean {
    return this.views.findIndex((x) => x.traversedHeight !== x.height) === -1;
  }

  get atTop(): boolean {
    return this.views.findIndex((x) => x.visibleHeight !== 0) === -1;
  }

  get belowFoldHeight(): number {
    return this.hasOverlay
      ? this.views
          .map((x) => x.height)
          .reduce((acc, h) => acc + h, this.missionStartTop)
      : 0;
  }

  set belowFoldTop(value: number) {
    this._belowFoldTop = value;
  }

  get belowFoldTop(): number {
    return this._belowFoldTop === 0
      ? this.contentHeight === 0
        ? 1000
        : this.contentHeight
      : Math.max(this._belowFoldTop, this.contentHeight);
  }

  get cumulativeHeights(): number[] {
    return this.views.map((x, i) => {
      return this.views.reduce(
        (acc, y, j) => (j <= i ? acc + y.height : acc),
        0
      );
    });
  }

  get cumulativeVisibleHeights(): number[] {
    return this.views.map((x, i) => {
      return this.views.reduce(
        (acc, y, j) => (j <= i ? acc + y.visibleHeight : acc),
        0
      );
    });
  }

  set contentHeight(value: number) {
    this.contentHeightSubject.next(value);
    this.resetSchoolName();
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

  get imagesLoaded(): boolean {
    return this.totalImages === this.preloadedImages.length;
  }

  get imageUrls(): string[] {
    // const backgroundImages = this.views.map(
    //   (x) => `assets/${x.backgroundImage}`
    // );
    const charts = this.views.reduce((acc, x) => {
      return [
        ...acc,
        ...toArray(x.charts).map((url) => `assets/charts/${url}`),
      ];
    }, []);
    return [
      // 'assets/splash.gif',
      `assets/${this.backgroundImageDefault}`,
      'assets/Olive_1.png',
      'assets/Olive_1_White.png',
      // ...backgroundImages,
      ...charts,
    ];
  }

  get isMobile(): boolean {
    return isMobile();
  }

  get missionTop(): number {
    return this.belowFoldTop + this.missionStartTop;
  }

  get scrollBelowFold(): number {
    return Math.max(this.scrollY - this.contentHeight, 0);
  }

  set scrollY(value: number) {
    this._scrollY = value;
    this.resetSchoolName();
  }

  get scrollY(): number {
    return this._scrollY;
  }

  set views(value: any[]) {
    this._views = this.calculateViews(value);
  }

  get views(): any[] {
    return this._views;
  }

  set windowHeight(value: number) {
    this._windowHeight = value;
  }

  get windowHeight(): number {
    return this._windowHeight;
  }

  ngOnInit(): void {
    setInterval(() => {
      this.animateArrow();
    }, 2000);
    const urls = this.imageUrls;
    this.totalImages = urls.length;
    this.imagePreload(urls);
  }

  animateArrow() {
    this.arrowAnimationState = false;
    setTimeout(() => {
      this.arrowAnimationState = true;
    }, 0);
  }

  backToTop() {
    this.resetBelowFoldTop();
    this.goToMission();
  }

  calculateViews(views: any[]): any[] {
    return this.mapToMobile(
      this.resetTraversedHeights(
        this.computeStickyPct(views, this.belowFoldYPct)
      )
    );
  }

  computeStickyPct(views: View[], belowFoldYPct: number): View[] {
    const activeIndex = this.activeViewIndex;
    const viewsWithStickyPct = views.map((x, i) => {
      if (i === 0) {
        return build(View, x, {
          stickyPct: Math.min(belowFoldYPct, 1),
        });
      }
      return build(View, x, {
        stickyPct:
          views[i - 1].traversedHeight /
          (views[i - 1].height - (this.isMobile ? 60 : 130)),
      });
    });
    return viewsWithStickyPct.map((x, i) => {
      const scrollSinceTop =
        this.scrollingDirection === 'DOWN'
          ? views[i].visibleHeight
          : views[i].traversedHeight;
      if (i > activeIndex) {
        return build(View, x, {
          offsetTop: this.isMobile ? 60 : 130,
        });
      }
      if (i === activeIndex) {
        return build(View, x, {
          offsetTop: Math.max((this.isMobile ? 60 : 130) - scrollSinceTop, 0),
        });
      }
      const offsetTop = viewsWithStickyPct.reduce((acc, x, j) => {
        return j <= i || j > activeIndex
          ? acc
          : j === activeIndex
          ? acc -
            (this.scrollingDirection === 'DOWN'
              ? views[j].visibleHeight
              : views[j].traversedHeight)
          : acc - views[j].height;
      }, 0);
      return build(View, x, {
        offsetTop,
      });
    });
  }

  imageLoaded(e, img) {
    this.preloadedImages = [...this.preloadedImages, img];
    // if (this.imagesLoaded) {
    //   console.log(`\nIMAGES PRELOADED`);
    //   console.dir(this.preloadedImages);
    // }
  }

  imagePreload(urls: string[]) {
    this.interval1 = setInterval(() => {
      this.timer1 += 1;
    }, 100);
    urls.forEach((url, i) => {
      let img = new Image();
      img.src = url;
      img.onload = (e) => {
        if (i === 0) {
          clearInterval(this.interval1);
        }
        this.imageLoaded(e, img);
      };
    });
  }

  loadImage2(e: string) {
    // console.log(e);
    clearInterval(this.interval2);
    // console.log(this.timer1, this.timer2);
  }

  mapToMobile(views: View[]): View[] {
    return this.activeViewIndex === -1
      ? views.map((x) =>
          build(View, x, {
            visibleHeight: 0,
          })
        )
      : views.map((x) =>
          build(View, x, {
            visibleHeight: x.height,
          })
        );
    // return views;
  }

  onLogoEnterEnd(e: AnimationEvent) {
    setTimeout(() => {
      this.logoLeftPx = this.contentWidth / 2 - (this.isMobile ? 150 : 250);
      this.logoTopPx = this.contentHeight / 2 - (this.isMobile ? 122 : 204);

      this.logoCopies = Dove.BuildAll(30);
      this.logoImageFinished = true;
    }, 100);
  }

  onCopyStart(e: AnimationEvent) {
    this.x0 = e.element.offsetWidth / 2;
    this.y0 = e.element.offsetHeight / 2;
    this.logoCopies.forEach((dove) => {
      dove.startShrink(
        this.x0 - 250,
        this.y0 - (this.logoHWRatio * 500) / 2,
        this.x0 - 40,
        this.y0 - (this.logoHWRatio * 100) / 2,
        100
      );
    });
  }

  onCopyEnd(e: AnimationEvent) {
    const h = e.element.offsetHeight;
    const w = e.element.offsetWidth;
    const x0 = w / 2;
    const y0 = h / 2;
    const r = Math.sqrt(Math.pow(x0, 2) + Math.pow(y0, 2));
    this.x0 = x0;
    this.y0 = y0;
    const d = (this.timeIncrement / this.totalTime) * r * 1.5;
    this.logoCopies.forEach((dove) => {
      dove.endShrink();
      dove.preFlight(d, x0 - 40, y0 - (this.logoHWRatio * 100) / 2);
      dove.startFlight(this.timeIncrement);
    });
    this.logosCopied = true;
    if (!this.backgroundImage) {
      this.interval2 = setInterval(() => {
        this.timer2 += 1;
      }, 100);
    }
    setTimeout(() => {
      this.hasOverlay = true;
      this.backgroundImage = this.backgroundImageDefault;
      this.logoCopies.forEach((dove) => {
        dove.endFlight();
      });
      if (this.scrollToView) {
        this.goToView(this.scrollToView);
      }
    }, this.totalTime);
  }

  onScroll(e: any) {
    if (this.manualScroll) {
      this.manualScroll = false;
      return;
    }
    this.onScrollToPosition(e.srcElement.scrollTop);
  }

  onScrollToPosition(scrollTop: number) {
    const d = this.scrollY - scrollTop;
    this.belowFoldYPct = scrollTop / this.belowFoldTop;
    if (scrollTop >= this.missionTop) {
      if (d <= 0) {
        // moving down
        if (this.atTop && this.scrollingDirection === null) {
          this.belowFoldTop = this.contentHeight + this.missionStartTop;
          this.activeViewIndex = -1;
          this.views = this.views.map((x) =>
            build(View, x, {
              visibleHeight: 0,
              traversedHeight: 0,
            })
          );
        } else {
          this.activeViewIndex = this.moveDown(Math.abs(d));
        }
        this.scrollingDirection = 'DOWN';
      } else {
        // moving up
        if (this.atBottom && this.scrollingDirection === 'DOWN') {
          // this.resetBelowFoldTop();
          this.scrollingDirection = null;
        } else {
          this.activeViewIndex = this.moveUp(scrollTop, d);
          this.scrollingDirection = 'UP';
        }
      }
    } else {
      this.resetBelowFoldTop();
      this.resetViews();
      this.activeViewIndex = -1;
      this.scrollingDirection = null;
    }
    this.scrollY = scrollTop;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.contentHeight = this.el.nativeElement.offsetHeight;
      this.contentWidth = this.el.nativeElement.offsetWidth;
    }, 0);
  }

  goDown() {
    if (this.activeViewIndex === -1) {
      this.goToMission();
    }
  }

  goToMission() {
    if (this.scrollable) {
      setTimeout(() => {
        this.scrollable.nativeElement.scrollTop = this.contentHeight - 30;
      }, 0);
    }
    this.resetViews();
  }

  goToVision() {
    this.dispatch(RouterActions.navigate(`/about?view=vision`));
  }

  goToView(view: string) {
    if (!view) {
      return;
    }
    switch (view.toLowerCase()) {
      case 'mission':
        this.goToMission();
        break;
    }
  }

  goToViewIndex(index: number) {
    // const cumulativeHeights = this.cumulativeHeights;
    // this.views = this.views.map((x, i) =>
    //   build(View, x, {
    //     visibleHeight: i <= index ? x.height : 0,
    //     traversedHeight: i < index ? x.height : 0,
    //   })
    // );
    // this.scrollTo(cumulativeHeights[index]);
  }

  isVisible(viewIndex: number, startYPx: number, endYPx: number): boolean {
    return (
      this.views[viewIndex].visibleHeight >= endYPx &&
      this.views[viewIndex].traversedHeight + this.contentHeight >= startYPx
    );
  }

  moveDown(dist: number): number {
    const startViewIndex =
      this.activeViewIndex === -1 ? 0 : this.activeViewIndex;
    const startViewHeight = this.views[startViewIndex].height;
    const startViewTraversedHeight = this.views[startViewIndex].traversedHeight;
    const startViewVisibleHeight = this.views[startViewIndex].visibleHeight;
    const endViewIndex =
      startViewIndex === this.views.length - 1
        ? this.views.length - 1
        : startViewHeight - startViewTraversedHeight < dist
        ? Math.min(startViewIndex + 1, this.views.length - 1)
        : startViewIndex;
    if (startViewVisibleHeight < startViewHeight) {
      this.moveDownResize(startViewIndex, dist);
      return startViewIndex;
    }
    this.moveDownScroll(startViewIndex, endViewIndex, dist);
    return endViewIndex;
  }

  moveDownResize(startViewIndex: number, dist: number) {
    const startViewHeight = this.views[startViewIndex].height;
    const startViewVisibleHeight = this.views[startViewIndex].visibleHeight;
    this.belowFoldTop =
      this.belowFoldTop +
      (startViewVisibleHeight + dist > startViewHeight
        ? Math.max(startViewHeight - startViewVisibleHeight, 0)
        : dist);
    this.views = this.views.map((x, i) => {
      const visibleHeight = Math.min(startViewVisibleHeight + dist, x.height);
      return i === startViewIndex
        ? build(View, x, {
            visibleHeight,
            traversedHeight:
              visibleHeight === x.height
                ? dist - (x.height - startViewVisibleHeight)
                : x.traversedHeight,
          })
        : x;
    });
  }

  moveDownScroll(startViewIndex: number, endViewIndex: number, dist: number) {
    const startViewHeight = this.views[startViewIndex].height;
    const startViewTraversedHeight = this.views[startViewIndex].traversedHeight;
    const startViewVisibleHeight = this.views[startViewIndex].visibleHeight;
    if (endViewIndex !== startViewIndex) {
      this.views = this.views.map((x, i) => {
        if (i === startViewIndex) {
          return build(View, x, {
            traversedHeight: x.height,
          });
        }
        if (i === endViewIndex) {
          return build(View, x, {
            visibleHeight: Math.max(
              dist - (startViewHeight - startViewTraversedHeight),
              0
            ),
          });
        }
        return x;
      });
    } else {
      this.views = this.views.map((x, i) => {
        return i === startViewIndex
          ? build(View, x, {
              traversedHeight: Math.min(
                startViewTraversedHeight + dist,
                x.height
              ),
            })
          : x;
      });
    }
  }

  moveUp(scrollY: number, dist: number): number {
    if (this.activeViewIndex === -1) {
      this.goToMission();
      return -1;
    }
    const startViewIndex =
      this.activeViewIndex === -1 ? 0 : this.activeViewIndex;
    const cumulativeHeights = this.cumulativeHeights;
    const endViewIndex = this.views.findIndex((x, i) => {
      const startY =
        i === 0
          ? this.belowFoldTop
          : this.belowFoldTop + cumulativeHeights[i - 1];
      return startY < scrollY && startY + x.height > scrollY;
    });
    if (endViewIndex === -1) {
      return this.activeViewIndex;
    }
    if (endViewIndex !== startViewIndex) {
      this.views = this.views.map((x, i) => {
        if (i === endViewIndex) {
          return build(View, x, {
            visibleHeight: x.height,
            traversedHeight:
              i === 0
                ? scrollY - this.belowFoldTop
                : scrollY - (this.belowFoldTop + cumulativeHeights[i - 1]),
          });
        }
        return build(View, x, {
          visibleHeight: x.height,
          traversedHeight: i < endViewIndex ? x.height : 0,
        });
      });
    } else {
      this.views = this.views.map((x, i) => {
        return i === startViewIndex
          ? build(View, x, {
              traversedHeight: Math.max(x.traversedHeight - dist, 0),
            })
          : x;
      });
    }
    return endViewIndex;
  }

  resetBelowFoldTop() {
    if (this.belowFoldTop !== this.contentHeight + this.missionStartTop) {
      this.belowFoldTop = this.contentHeight + this.missionStartTop;
    }
  }

  resetStickyStartPositions() {
    const margin = 10;
    const marginLeft = this.contentWidth * 0.02;
    this.views[0].topStart = 1;
    this.views[1].topStart = 35 + margin;
    this.views[2].topStart = 35 + 67 + 2 * margin - 25;
    this.views[3].topStart = 2 * 35 + 67 + 3 * margin - 30;
    this.views[4].topStart = 3 * 35 + 67 + 4 * margin - 40;
    this.views[5].topStart = 4 * 35 + 67 + 5 * margin - 30;
    this.views[6].topStart = 4 * 35 + 2 * 67 + 6 * margin - 50;
    this.views[1].leftStart = marginLeft;
    this.views[2].leftStart = marginLeft;
    this.views[3].leftStart = marginLeft;
    this.views[4].leftStart = marginLeft;
    this.views[5].leftStart = marginLeft;
    this.views[6].leftStart = marginLeft;
    this.views[0].height = 1900;
    this.views[1].height = 1600;
    this.views[2].height = 2100;
    this.views[3].height = 1900;
    this.views[4].height = 1700;
    this.views[5].height = 2000;
    this.views[6].height = 2000;
  }

  resetSchoolName() {
    setTimeout(() => {
      const pctTraversed = Math.min(this.scrollY / (this.contentHeight / 2), 1);

      // set position left
      if (!this.schoolNameEl || this.scrollY === 0) {
        this.schoolNameLeft = null;
      } else {
        const leftStart = this.schoolNameEl.nativeElement.offsetLeft;
        const leftEnd = 60;
        this.schoolNameLeft = leftStart - pctTraversed * (leftStart - leftEnd);
      }

      // set position top
      if (this.views[0].isFixed) {
        this.schoolNameTop = this.views[0].top;
      } else {
        const topStart = 120;
        const topEnd = this.contentHeight - 24;
        this.schoolNameTop = topStart - pctTraversed * (topStart - topEnd);
      }
      const fontSizeStart = 32;
      const fontSizeEnd = 22;
      this.schoolNameFontSize =
        fontSizeStart - pctTraversed * (fontSizeStart - fontSizeEnd);
    }, 0);
  }

  resetTraversedHeights(views: View[]): View[] {
    return views.map((x, i) =>
      build(View, x, {
        traversedHeight: i <= this.activeViewIndex ? x.traversedHeight : 0,
        visibleHeight: i <= this.activeViewIndex ? x.visibleHeight : 0,
      })
    );
  }

  resetViews() {
    this.views = this.views.map((x) =>
      build(View, x, {
        visibleHeight: 0,
        traversedHeight: 0,
      })
    );
  }

  scrollTo(scrollTop: number) {
    if (this.scrollable) {
      setTimeout(() => {
        this.scrollable.nativeElement.scrollTop = scrollTop;
      }, 0);
    }
  }

  showMissionIndex(i: number) {
    // return (
    //   this.activeViewIndex === -1 ||
    //   this.views[this.activeViewIndex].isFixed ||
    //   this.views[this.activeViewIndex].stickyPct > 0
    // );
    return this.activeViewIndex === -1;
    // return true;
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
