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
  integerArray,
  routeParamSelector,
  SmartComponent,
  toArray,
  truthy,
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
} from 'angular-animations';
import { Store } from '@ngrx/store';
import { filter, throwIfEmpty } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  Quote,
  ABOUT_SUBMENU,
  ACADEMICS_SUBMENU,
  ADMISSIONS_SUBMENU,
  CONTACT_SUBMENU,
} from '../shared/models';

export class Dove {
  static BuildAll(n: number): Dove[] {
    const dTheta = (2 * Math.PI) / n;
    return integerArray(n).map((id, i) =>
      build(Dove, {
        id,
        theta: dTheta * i,
      })
    );
  }

  id = 0;
  dx = 0;
  dy = 0;
  leftPx = 0;
  topPx = 0;
  imgSrc = 'assets/Olive_1_White.png';
  _index = 0;
  interval: any;
  iteration = 0;
  theta = 0;

  set index(value: number) {
    this._index = value;
  }

  get index(): number {
    return this._index;
  }

  preFlight(d: number, x0: number, y0: number) {
    this.leftPx = x0;
    this.topPx = y0;
    if (this.theta === 0 || this.theta === 2 * Math.PI) {
      this.dy = -d;
      this.dx = 0;
    } else if (this.theta > 0 && this.theta < Math.PI / 2) {
      this.dy = -1 * d * Math.cos(this.theta);
      this.dx = d * Math.sin(this.theta);
    } else if (this.theta === Math.PI / 2) {
      this.dy = 0;
      this.dx = d;
    } else if (this.theta > Math.PI / 2 && this.theta < Math.PI) {
      this.dy = d * Math.sin(this.theta - Math.PI / 2);
      this.dx = d * Math.cos(this.theta - Math.PI / 2);
    } else if (this.theta === Math.PI) {
      this.dy = d;
      this.dx = 0;
    } else if (this.theta > Math.PI && this.theta < (3 * Math.PI) / 2) {
      this.dy = d * Math.cos(this.theta - Math.PI);
      this.dx = -1 * d * Math.sin(this.theta - Math.PI);
    } else if (this.theta === (3 * Math.PI) / 2) {
      this.dy = 0;
      this.dx = -d;
    } else {
      this.dy = -1 * d * Math.sin(this.theta - (3 * Math.PI) / 2);
      this.dx = -1 * d * Math.cos(this.theta - (3 * Math.PI) / 2);
    }
  }

  startFlight(dt: number) {
    this.interval = setInterval(() => {
      this.topPx += this.dy;
      this.leftPx += this.dx;
      // this.imgSrc =
      //   this.imgSrc === 'assets/Olive_1.png'
      //     ? 'assets/Olive_1_White.png'
      //     : 'assets/Olive_1.png';
    }, dt);
  }

  endFlight() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startShrink(
    leftPx: number,
    topPx: number,
    leftPxEnd: number,
    topPxEnd: number,
    iterations: number
  ) {
    this.topPx = topPx;
    this.leftPx = leftPx;
    const dt = 1000 / iterations;
    const dy = (topPxEnd - topPx) / iterations;
    const dx = (leftPxEnd - leftPx) / iterations;
    this.interval = setInterval(() => {
      this.topPx += dy;
      this.leftPx += dx;
    }, dt);
  }

  endShrink() {
    if (this.interval) {
      this.iteration = 0;
      clearInterval(this.interval);
    }
  }
}

class View {
  id = 0;
  background = 'rgba(30, 63, 102, 0.91)';
  charts: string[] = [];
  display: 'flex' | 'none' = 'flex';
  _visible = false;
  offsetTop = 0;
  name = '';
  height = 0;
  quotes = [];
  topStart = 0;
  topEnd = 0;
  leftStart = 0;
  leftEnd = 380;
  html = '';
  stickyPct = 0;
  traversedHeight = 0;
  _visibleHeight = 0;

  get chartsBy2(): any {
    return this.charts.reduce((acc, x, i) => {
      return i % 2 === 0
        ? [...acc, [x]]
        : [
            ...acc.filter((y, j) => j < acc.length - 1),
            [...acc[acc.length - 1], x],
          ];
    }, []);
  }

  get chartsBy3(): any {
    return this.charts.reduce(
      (acc: string[][], x: string, i: number): string[][] => {
        return i % 3 === 0
          ? [...acc, [x]]
          : [
              ...acc.filter((y, j) => j < acc.length - 1),
              [...acc[acc.length - 1], x],
            ];
      },
      <string[][]>[]
    );
  }

  get left(): number {
    return this.leftStart - this.stickyPct * (this.leftStart - this.leftEnd);
  }

  get isFixed(): boolean {
    return this.stickyPct >= 1;
  }

  get top(): number {
    const absoluteTop =
      this.topStart - this.stickyPct * (this.topStart - this.topEnd);
    return this.isFixed ? this.offsetTop : Math.max(absoluteTop, -130);
  }

  set visible(value: boolean) {
    this._visible = value;
    if (!value) {
      this._visibleHeight = 0;
    }
  }

  get visible(): boolean {
    return this._visible;
  }

  set visibleHeight(value: number) {
    if (this._visibleHeight === 0 && value > 0) {
      this._visible = true;
    }
    this._visibleHeight = value;
  }

  get visibleHeight(): number {
    return this._visibleHeight;
  }
}

@Component({
  selector: 'logos-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    bounceAnimation(),
    rotateInDownLeftOnEnterAnimation(),
    rotateInUpRightOnEnterAnimation(),
    rollInOnEnterAnimation(),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    fadeInLeftBigOnEnterAnimation(),
    fadeInRightBigOnEnterAnimation(),
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
        style({ width: '5000px', opacity: 1, zIndex: 9 }),
        animate(
          '3000ms ease-out',
          style({ width: '500px', opacity: 0.9, zIndex: -1 })
        ),
      ]),
    ]),
    trigger('copyAndShrink', [
      transition(':enter', [
        query('.logo-mini', [
          style({ width: '500px', opacity: '0.2' }),
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
          width: '500px',
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
export class HomeComponent
  extends SmartComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('scrollable') scrollable: ElementRef;
  @ViewChildren('stretchyEl') stretchyEl: QueryList<ElementRef>;
  @ViewChild('schoolName') schoolNameEl: ElementRef | undefined = undefined;
  _activeViewIndex = 0;
  arrowAnimationState = false;
  backgroundImage = '';
  _belowFoldTop = 0;
  belowFoldYPct = 0;
  chartOverlay: string | null = null;
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
  stretchyHeaderHeight = 130;
  timeIncrement = 10;
  totalImages = 0;
  totalTime = 3000;
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
  _views = [
    build(View, {
      id: 1,
      name: 'scripture',
      height: 1500,
      visibleHeight: 0,
      topStart: 0,
      leftStart: 330,
      background: 'rgba(30, 63, 102, 0.91)',
      backgroundImage: 'images/Landscape.jpg',
      html: `
          in faithful submission to <span class="bold">Scripture</span> and
      `,
      verses: [
        {
          ref: 'Isaiah 40:8',
          words:
            'The grass withers, the flower fades, but the word of our God will stand forever.',
        },
        {
          ref: '2 Timothy 3:16-17',
          words:
            'All scripture is God-breathed and is useful for teaching, rebuking, correcting, and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.',
        },
        {
          ref: 'Hebrews 4:12',
          words:
            'For the word of God is living and active and sharper than any two-edged sword...',
        },
        {
          ref: 'Colossians 3:16',
          words:
            'Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit, singing to God with gratitude in your hearts.',
        },
        {
          ref: 'Psalm 119',
          words: [
            'Thy word is a lamp unto my feet, and a light unto my path. (v. 105)',
            `The sum of Your word is truth, And every one of Your righteous ordinances is everlasting. (v.160)`,
          ],
        },
      ],
      charts: [],
      quotes: [
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi.
          `,
        }),
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi.
          `,
        }),
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi.
          `,
        }),
      ],
    }),
    build(View, {
      id: 2,
      name: 'parents',
      height: 1000,
      visibleHeight: 0,
      topStart: 100,
      leftStart: 360,
      background: 'rgba(30, 63, 102, 0.91)',
      backgroundImage: 'images/20.jpg',
      html: `
        with deference to the authority granted therein to
        <span class="bold">parents</span> regarding the instruction of their
        children,
      `,
      verses: [
        {
          ref: 'Ephesians 6:4',
          words:
            'Fathers, do not provoke your children to anger, but bring them up in the discipline and instruction of the Lord.',
        },
        {
          ref: '1 John 1:4',
          words:
            'I have no greater joy than to hear that my children are walking in the truth.',
        },
        {
          ref: 'Proverbs 22:6',
          words:
            'Train up a child in the way he should go, Even when he is old he will not depart from it.',
        },
        {
          ref: 'Joshua 24:15',
          words: '...as for me and my house, we will serve the Lord.',
        },
        {
          ref: 'Deuteronomy 6:4-9',
          words: [
            'Hear, O Israel! The LORD is our God, the LORD is One!',
            'Love the LORD your God with all your heart and with all your soul and with all your strength.',
            'These commandments that I give you today are to be on your hearts.',
            'Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up.',
            'Tie them as symbols on your hands and bind them on your foreheads.',
            'Write them on the doorframes of your houses and on your gates.',
          ],
        },
      ],
      quotes: [
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi.
          `,
        }),
        build(Quote, {
          words: `
            What if it is impossible to separate education from discipleship, learning from faith?
            What if what you BELIEVE about everything impacts what you THINK about anything?
          `,
        }),
        build(Quote, {
          words: `
            Choosing the story of a child's life is the exclusive right of parents.
          `,
        }),
      ],
    }),
    build(View, {
      id: 3,
      name: 'classical, Christ-centered',
      height: 1000,
      visibleHeight: 0,
      topStart: 200,
      leftStart: 390,
      background: 'rgba(30, 63, 102, 0.91)',
      backgroundImage: 'images/21.jpg',
      html: `
        provides a <span class="bold">classical, Christ-centered</span> education
      `,
      verses: [
        {
          ref: 'Proverbs 9:10',
          words:
            'The fear of the LORD is the beginning of wisdom, And the knowledge of the Holy One is understanding.',
        },
        {
          ref: 'Colossians 2:2-3',
          words: `
            that their hearts may be encouraged, having been knit together in love, and attaining to all the wealth that comes from the full assurance of understanding, resulting in a true knowledge of God’s mystery, that is, Christ Himself,
            in whom are hidden all the treasures of wisdom and knowledge.
          `,
        },
        {
          ref: 'Phillipians 4:8',
          words:
            'Finally, brothers, whatever is true, whatever is honorable, whatever is just, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence, if there is anything worthy of praise, think about these things.',
        },
        {
          ref: '1 Corinthians 3:7',
          words:
            'So neither the one who plants nor the one who waters is anything, but only God, who makes things grow.',
        },
      ],
      charts: [
        '2019_ACCS_Total_Student_Enrollment_12_11_19.jpg',
        'ACCS_School_Membership_12_11_19.jpg',
        'accs_map.png',
      ],
      quotes: [
        build(Quote, {
          words: `
            A classical, Christian education immerses students in the best stories that human tradition has to offer, always in the context of the overarching true story of the Gospel.
          `,
        }),
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi.
          `,
        }),
        build(Quote, {
          words: `
            Our curriculum does not include merely a list of great books, but a canon of literature formulated for the purpose of writing students into the narrative of a transcendent and knowable reality.
          `,
        }),
      ],
    }),
    build(View, {
      id: 4,
      name: 'excellence',
      height: 2000,
      visibleHeight: 0,
      topStart: 300,
      leftStart: 420,
      background: 'rgba(30, 63, 102, 0.91)',
      backgroundImage: 'images/11.jpg',
      html: `
      designed to achieve academic
            <span class="bold">excellence</span> and
      `,
      verses: [
        {
          ref: 'Colossians 3:23',
          words:
            'Whatever you do, do your work heartily, as for the Lord rather than for men,',
        },
        {
          ref: '1 Corinthians 9:23-24',
          words: `
            I do all things for the sake of the gospel, so that I may become a fellow partaker of it.
            Do you not know that those who run in a race all run, but only one receives the prize? Run in such a way that you may win.
          `,
        },
        {
          ref: 'Matthew 22:37-38',
          words: `
            And He said to him, “‘You shall love the Lord your God with all your heart, and with all your soul, and with all your mind.’
            This is the great and foremost commandment.
          `,
        },
      ],
      charts: [
        'ACT_2019.PNG',
        'SAT_2019.PNG',
        'PSAT_2019.PNG',
        'SAT_byType_2019.PNG',
        'chart_college_preparedforcollege5_500x376.png',
        'SAT_CareerReadiness_2019.PNG',
        'chart_college_earneda5_500x376.png',
        'chart_college_earnedba7_500x376.png',
        'chart_college_job7_500x376.png',
      ],
      quotes: [
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi.
          `,
        }),
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi.
          `,
        }),
      ],
    }),
    build(View, {
      id: 5,
      name: 'love of learning',
      height: 1000,
      visibleHeight: 0,
      topStart: 400,
      leftStart: 450,
      background: 'rgba(30, 63, 102, 0.91)',
      backgroundImage: 'images/17.jpg',
      html: `
      instill a life-long <span class="bold">love of learning</span>
      `,
      verses: [
        {
          ref: 'Proverbs 19:1',
          words:
            'The heavens declare the glory of God; the skies proclaim the work of his hands.',
        },
        {
          ref: 'Isaiah 6:2-3',
          words: [
            'Above him were seraphim, each with six wings: With two wings they covered their faces, with two they covered their feet, and with two they were flying. And they were calling to one another:',
            `
            “Holy, holy, holy is the Lord Almighty;
                the whole earth is full of his glory.”
                `,
          ],
        },
        {
          ref: 'Psalm 33:6',
          words:
            'By the word of the Lord the heavens were made, their starry host by the breath of his mouth.',
        },
        {
          ref: 'Psalm 8:1-4',
          words: [
            `Lord, our Lord,
            how majestic is your name in all the earth!

        You have set your glory
            in the heavens.`,
            `Through the praise of children and infants
            you have established a stronghold against your enemies,
            to silence the foe and the avenger.`,
            `When I consider your heavens,
            the work of your fingers,
        the moon and the stars,
            which you have set in place,`,
            `what is mankind that you are mindful of them,
            human beings that you care for them?`,
          ],
        },
      ],
      charts: [
        'chart_conservative_readnon7_500x376.png',
        'chart_conservative_read5_500x376.png',
        'chart_thinkers_consensus5.png',
      ],
      quotes: [
        build(Quote, {
          words: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi. Etiam in blandit augue. Donec in dignissim risus. Vivamus ut suscipit urna.
          `,
        }),
        build(Quote, {
          words: `
            Learning that leads students to love what they retain and continue in imaginative pursuit of the true and the real gives rise to contemplation of what is truly possible.
            Creative appropriation of retained knowledge is the cognitive calling card of the classically educated.
          `,
        }),
        build(Quote, {
          words: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi. Etiam in blandit augue. Donec in dignissim risus. Vivamus ut suscipit urna.
          `,
        }),
      ],
    }),
    build(View, {
      id: 6,
      name: 'worldview',
      height: 1500,
      visibleHeight: 0,
      topStart: 500,
      leftStart: 480,
      background: 'rgba(30, 63, 102, 0.91)',
      backgroundImage: 'images/12.jpg',
      html: `
      through enthusiastic affirmation of the
            <span class="bold">Christian worldview</span> as the foundation for
            knowledge, virtue, and beauty,
      `,
      verses: [
        {
          ref: 'Psalm 24:1',
          words: `The earth is the Lord's and the fullness thereof, the world and those who dwell therein,`,
        },
        {
          ref: 'Acts 17:28',
          words: `
            for ‘In him we live and move and have our being’; as even some of your own poets have said, ‘For we are indeed his offspring.’
          `,
        },
        {
          ref: 'Colossians 2:8',
          words:
            'See to it that no one takes you captive through philosophy and empty deception, according to the tradition of men, according to the elementary principles of the world, rather than according to Christ.',
        },
        {
          ref: 'Ecclesiates 7:14',
          words:
            'In the day of prosperity be joyful, and in the day of adversity consider: God has made the one as well as the other, so that man may not find out anything that will be after him.',
        },
        {
          ref: 'Isaiah 40:31',
          words: `
          but in your hearts honor Christ the Lord as holy, always being prepared to make a defense to anyone who asks you for a reason for the hope that is in you; yet do it with gentleness and respect,
          `,
        },
        {
          ref: 'Romans 11:36',
          words: `For from him and through him and for him are all things.
          To him be the glory forever! Amen.`,
        },
        {
          ref: 'Hebrews 1:2-3',
          words: [
            `but in these last days he has spoken to us by his Son, whom he appointed heir of all things, and through whom also he made the universe.`,
            `The Son is the radiance of God’s glory and the exact representation of his being, sustaining all things by his powerful word. After he had provided purification for sins, he sat down at the right hand of the Majesty in heaven.`,
          ],
        },
      ],
      charts: [
        'chart_conservative_bibleguide5_500x376.png',
        'good-soil-read-bible.jpg',
        'chart_conservative_errors7_500x376.png',
        'chart_life_thankful7_500x376.png',
        'chart_life_spirituality7_500x376.png',
        'chart_life_suffering7_500x376.png',
        'chart_life_direction7_500x376.png',
        'chart_life_friends7_500x376.png',
        'chart_life_nothelpless7_500x376.png',
      ],
      quotes: [
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi. Etiam in blandit augue. Donec in dignissim risus. Vivamus ut suscipit urna. Proin suscipit elementum ex, vel viverra lacus
        `,
        }),
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi. Etiam in blandit augue. Donec in dignissim risus. Vivamus ut suscipit urna.
        `,
        }),
        build(Quote, {
          words: `
          If I remove THE way and THE truth and THE life from my thought processes, I am lefft hopelessly relying on "my truth" to navigate "my best life now" according to my own standard.
          `,
        }),
      ],
    }),
    build(View, {
      id: 7,
      name: 'glorify God',
      height: 2000,
      visibleHeight: 0,
      topStart: 600,
      leftStart: 510,
      background: 'rgba(30, 63, 102, 0.91)',
      backgroundImage: 'images/landscape_1.jpg',
      html: `
      so that each student is equipped to
            <span class="bold">joyfully glorify God</span> in every aspect of
            life.
      `,
      verses: [
        {
          ref: 'Luke 12:31',
          words: 'But seek His kingdom, and these things will be added to you.',
        },
        {
          ref: 'Matthew 6:33',
          words:
            'But seek first the kingdom of God and his righteousness, and all these things will be added to you.',
        },
        {
          ref: 'Romans 12:2',
          words:
            'Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect.',
        },
        {
          ref: '1 John 5:4',
          words:
            'For whatever is born of God overcomes the world; and this is the victory that has overcome the world — our faith.',
        },
        {
          ref: '2 Corinthians 10:5',
          words:
            'We destroy arguments and every lofty opinion raised against the knowledge of God, and take every thought captive to obey Christ,',
        },
        {
          ref: 'Matthew 25:21',
          words: `
          His master said to him, ‘Well done, good and faithful servant.[a] You have been faithful over a little; I will set you over much. Enter into the joy of your master.’
          `,
        },
        {
          ref: '1 Peter 3:15',
          words: `
            but in your hearts honor Christ the Lord as holy, always being prepared to make a defense to anyone who asks you for a reason for the hope that is in you; yet do it with gentleness and respect,
          `,
        },
      ],
      charts: [
        'chart_christianlife_family7_500x376.png',
        'chart_christian_practices_readlit6_500x376.png',
        'chart_christian_practice_disciplines5_500x376.png',
        'chart_christian_practice_smallgroup_500x376.png',
        'chart_influencers_organizations6_500x376.png',
        'chart_christianpractices_attendance7_500x376.png',
        'chart_christianlife_volunteertotal8_500x376.png',
        'chart_christianlife_poor7_500x376.png',
        'chart_influencers_injustice5_500x376.png',
      ],
      quotes: [
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi. Etiam in blandit augue. Donec in dignissim risus. Vivamus ut suscipit urna.
          `,
        }),
        build(Quote, {
          words: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in velit lobortis, dapibus ligula in, sagittis nisi.
          `,
        }),
        build(Quote, {
          words: `
          In Christ and by the Spirit, the redeemed person walks in newness of life, by faith trusting God and keeping His commandments on the path to wisdom.
          `,
        }),
        build(Quote, {
          words: `
           Here's what's true of you. Here's what's true of the world. Therefore, go act in the world with faith in that truth.
          `,
        }),
      ],
    }),
  ];
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
  }

  set activeViewIndex(value: number) {
    if (value !== this._activeViewIndex) {
      this._activeViewIndex = Math.max(
        value < this.views.length ? value : -1,
        -1
      );
      if (this._activeViewIndex === -1 && falsy(this.backgroundImage)) {
        this.backgroundImage = 'splash.gif';
      } else if (
        this._activeViewIndex !== -1 &&
        this.backgroundImage === 'splash.gif'
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
    const backgroundImages = this.views.map(
      (x) => `assets/${x.backgroundImage}`
    );
    const charts = this.views.reduce((acc, x) => {
      return [
        ...acc,
        ...toArray(x.charts).map((url) => `assets/charts/${url}`),
      ];
    }, []);
    return ['assets/splash.gif', ...backgroundImages, ...charts];
  }

  get isMobile(): boolean {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    );
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
    this._views = this.computeStickyPct(value, this.belowFoldYPct);
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
    }, 3000);
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

  computeStickyPct(views: View[], belowFoldYPct: number): View[] {
    const activeIndex = this.activeViewIndex;
    const viewsWithStickyPct = views.map((x, i) => {
      if (i === 0) {
        return build(View, x, {
          stickyPct: Math.min(belowFoldYPct, 1),
        });
      }
      return build(View, x, {
        stickyPct: views[i - 1].traversedHeight / (views[i - 1].height - 130),
      });
    });
    return viewsWithStickyPct.map((x, i) => {
      const scrollSinceTop =
        this.scrollingDirection === 'DOWN'
          ? views[i].visibleHeight
          : views[i].traversedHeight;
      if (i > activeIndex) {
        return build(View, x, {
          offsetTop: 130,
        });
      }
      if (i === activeIndex) {
        return build(View, x, {
          offsetTop: Math.max(130 - scrollSinceTop, 0),
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
    if (this.imagesLoaded) {
      console.log(`\nIMAGES PRELOADED`);
      console.dir(this.preloadedImages);
    }
  }

  imagePreload(urls: string[]) {
    this.interval1 = setInterval(() => {
      this.timer1 += 1;
      console.log(this.timer1);
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
    console.log(e);
    clearInterval(this.interval2);
    console.log(this.timer1, this.timer2);
  }

  onLogoEnterEnd(e: AnimationEvent) {
    setTimeout(() => {
      this.logoLeftPx = this.contentWidth / 2 - 250;
      this.logoTopPx = this.contentHeight / 2 - 204;
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
      console.log('set interval 2');
      this.interval2 = setInterval(() => {
        this.timer2 += 1;
        console.log(this.timer2);
      }, 100);
    }
    setTimeout(() => {
      this.hasOverlay = true;
      this.backgroundImage = 'splash.gif';
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
        this.scrollable.nativeElement.scrollTop = this.isMobile
          ? this.contentHeight
          : this.contentHeight - 30;
      }, 0);
    }
    this.resetViews();
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
    const cumulativeHeights = this.cumulativeHeights;
    this.views = this.views.map((x, i) =>
      build(View, x, {
        visibleHeight: i <= index ? x.height : 0,
        traversedHeight: i < index ? x.height : 0,
      })
    );
    this.scrollTo(cumulativeHeights[index]);
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
    if (!this.isMobile) {
      const h = (this.contentHeight - 130) * (2 / 3);
      const unspaced = 4 * 35 + 3 * 67;
      const margin = (h - unspaced) / 7;
      this.views[1].topStart = 35 + margin;
      this.views[2].topStart = 35 + 67 + 2 * margin;
      this.views[3].topStart = 2 * 35 + 67 + 3 * margin;
      this.views[4].topStart = 3 * 35 + 67 + 4 * margin;
      this.views[5].topStart = 4 * 35 + 67 + 5 * margin;
      this.views[6].topStart = 4 * 35 + 2 * 67 + 6 * margin;
      this.views[0].height = 1200;
      this.views[1].height = 1500;
      this.views[2].height = 1600;
      this.views[3].height = 1800;
      this.views[4].height = 1600;
      this.views[5].height = 1800;
      this.views[6].height = 2000;
    } else {
      const h = (this.contentHeight - 130) * (5 / 6);
      const unspaced = 4 * 35 + 3 * 67;
      const margin = (h - unspaced) / 7;
      const marginLeft = this.contentWidth * 0.02;
      this.views[0].topStart = 1;
      this.views[1].topStart = 35 + margin + 20;
      this.views[2].topStart = 35 + 67 + 2 * margin;
      this.views[3].topStart = 2 * 35 + 67 + 3 * margin;
      this.views[4].topStart = 3 * 35 + 67 + 4 * margin;
      this.views[5].topStart = 4 * 35 + 67 + 5 * margin + 15;
      this.views[6].topStart = 4 * 35 + 2 * 67 + 6 * margin;
      this.views[1].leftStart = marginLeft;
      this.views[2].leftStart = marginLeft;
      this.views[3].leftStart = marginLeft;
      this.views[4].leftStart = marginLeft;
      this.views[5].leftStart = marginLeft;
      this.views[6].leftStart = marginLeft;
      this.views[0].height = 1800;
      this.views[1].height = 1700;
      this.views[2].height = 1600;
      this.views[3].height = 1800;
      this.views[4].height = 1600;
      this.views[5].height = 1800;
      this.views[6].height = 2000;
    }
  }

  resetSchoolName() {
    setTimeout(() => {
      const pctTraversed = Math.min(this.scrollY / (this.contentHeight / 4), 1);
      if (!this.schoolNameEl || this.scrollY === 0) {
        this.schoolNameLeft = null;
      } else {
        const leftStart = this.schoolNameEl.nativeElement.offsetLeft;
        const leftEnd = this.isMobile ? 60 : 127;
        this.schoolNameLeft = leftStart - pctTraversed * (leftStart - leftEnd);
      }
      if (this.views[0].isFixed) {
        this.schoolNameTop = this.views[0].top;
      } else {
        const topStart = this.contentHeight - 370;
        const topEnd = this.isMobile
          ? this.contentHeight + 1
          : this.contentHeight + 18;
        this.schoolNameTop = topStart - pctTraversed * (topStart - topEnd);
      }
      const fontSizeStart = this.isMobile ? 40 : 60;
      const fontSizeEnd = this.isMobile ? 22 : 28;
      this.schoolNameFontSize =
        fontSizeStart - pctTraversed * (fontSizeStart - fontSizeEnd);
    }, 0);
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

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

  logViews() {
    console.log(
      `\n\nScripture\nVisible Height:\t${this.views[0].visibleHeight}\nTraversed Height:\t${this.views[0].traversedHeight}`
    );
    console.log(
      `\n\nParents\nVisible Height:\t${this.views[1].visibleHeight}\nTraversed Height:\t${this.views[1].traversedHeight}`
    );
    console.log(
      `\n\nClassical, Christ-centered\nVisible Height:\t${this.views[2].visibleHeight}\nTraversed Height:\t${this.views[2].traversedHeight}`
    );
    console.log(
      `\n\nExcellence\nVisible Height:\t${this.views[3].visibleHeight}\nTraversed Height:\t${this.views[3].traversedHeight}`
    );
    console.log(
      `\n\nLove of Learning\nVisible Height:\t${this.views[4].visibleHeight}\nTraversed Height:\t${this.views[4].traversedHeight}`
    );
    console.log(
      `\n\nWorldview\nVisible Height:\t${this.views[5].visibleHeight}\nTraversed Height:\t${this.views[5].traversedHeight}`
    );
    console.log(
      `\n\nGlorify God\nVisible Height:\t${this.views[6].visibleHeight}\nTraversed Height:\t${this.views[6].traversedHeight}`
    );
  }
}
