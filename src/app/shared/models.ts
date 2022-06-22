import { build, integerArray, Metadata } from '@caiu/library';

export class BibleVerse {}

export class Citation {
  queryParams = {};
  routerLink = '/about';
  via = 'from Logos School Vision Statement';
}

export class MenuItem {
  label = '';
  queryParams: any;
  routerLink = '';
  externalLink = null;
}

export class Quote {
  citation: Citation = new Citation();
  html = '';
  words = '';
}

export const ABOUT_SUBMENU: MenuItem[] = [
  build(MenuItem, {
    label: 'Mission Statement',
    routerLink: '/about',
    queryParams: {
      view: 'mission',
    },
  }),
  build(MenuItem, {
    label: 'Statement of Faith',
    routerLink: '/about',
    queryParams: {
      view: 'beliefs',
    },
  }),
  build(MenuItem, {
    label: 'Vision & Philosophy',
    routerLink: '/about',
    queryParams: {
      view: 'vision',
    },
  }),
  // build(MenuItem, {
  //   label: 'FAQs',
  //   routerLink: '/about',
  //   queryParams: {
  //     view: 'faqs',
  //   },
  // }),
];
export const ACADEMICS_SUBMENU: MenuItem[] = [
  build(MenuItem, {
    label: 'Why Classical?',
    externalLink: 'https://classicalchristian.org/what-is-cce/',
    routerLink: '/academics',
    queryParams: {
      view: 'classical',
    },
  }),
  build(MenuItem, {
    label: 'Curriculum',
    routerLink: '/academics',
    queryParams: {
      view: 'curriculum',
    },
  }),
  // build(MenuItem, {
  //   label: 'Instruction',
  //   routerLink: '/academics',
  //   queryParams: {
  //     view: 'instruction',
  //   },
  // }),
  build(MenuItem, {
    label: 'Accreditation (ACCS)',
    externalLink: 'https://classicalchristian.org/',
    routerLink: '/academics',
    queryParams: {
      view: 'accs',
    },
  }),
];
export const ADMISSIONS_SUBMENU: MenuItem[] = [
  build(MenuItem, {
    label: 'Tuition',
    routerLink: '/admissions',
    queryParams: {
      view: 'tuition',
    },
  }),
  build(MenuItem, {
    label: 'Visit',
    routerLink: '/contact',
  }),
  build(MenuItem, {
    label: 'Application',
    routerLink: '/links',
  }),
];
export const CONTACT_SUBMENU: MenuItem[] = [
  build(MenuItem, {
    label: 'Donate',
    routerLink: '/donate',
  }),
  build(MenuItem, {
    label: 'Apply',
    routerLink: '/links',
  }),
  build(MenuItem, {
    label: 'Volunteer',
    routerLink: '/contact',
    queryParams: {
      view: 'volunteer',
    },
  }),
];

export class View {
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

export class CreditCard {
  cardNumber4 = '';
  cardNumber8 = '';
  cardNumber12 = '';
  cardNumber16 = '';
  expirationDate2 = '';
  expirationDate4 = '';
  cardCode = '';

  set cardNumber(value: string) {
    this.cardNumber4 = value.substring(0, 3);
    this.cardNumber8 = value.substring(4, 7);
    this.cardNumber12 = value.substring(8, 11);
    this.cardNumber16 = value.substring(12, 15);
  }

  get cardNumber(): string {
    return `${this.cardNumber4}${this.cardNumber8}${this.cardNumber12}${this.cardNumber16}`;
  }

  set expirationDate(value: string) {
    this.expirationDate2 = value.substring(0, 1);
    this.expirationDate4 = value.substring(2, 3);
  }

  get expirationDate(): string {
    return `${this.expirationDate2}${this.expirationDate4}`;
  }

  get metadata(): Metadata {
    return build(Metadata, {
      ignore: ['cardNumber', 'expirationDate'],
    });
  }
}

export class CustomerAddress {
  firstName = '';
  lastName = '';
  email = '';
  address = '';
  city = '';
  zip = '';
}

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

export const MISSION_VIEWS = [
  build(View, {
    id: 1,
    name: 'scripture',
    height: 1500,
    visibleHeight: 0,
    topStart: 0,
    leftStart: 330,
    background: 'rgba(30, 63, 102, 0.91)',
    backgroundImage: 'images/Landscape.jpg',
    // backgroundImage: 'images/19.jpg',
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
        In a post-modern culture where narrative reigns supreme,
        Logos School invites students to embrace their calling in the true story of God's spoken world,
        where Christ, in Whom are hidden all the treasures of wisdom and knowledge, is King.       `,
      }),
      build(Quote, {
        words: `
        In the beginning of this story was the Word, the Logos.
        Through Him all things were made and by Him all things are being made new.
        He is, therefore, both the storyteller and the hero of the story - the author of salvation.
        `,
      }),
      build(Quote, {
        words: `
        If God created out of nothing, entered into His Creation, died, and rose again, then His Word must be the final word, and His standard the ultimate standard.
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
          Our educational mandate does not come from government, but from parents committed to bringing their children up in the discipline and instruction (Paideia) of the Lord.
        `,
      }),
      build(Quote, {
        words: `
          Logos School works with and for parents.
          Our desire is to be a service to parents, not a replacement for them.
        `,
      }),
      build(Quote, {
        words: `
          What if it is impossible to separate education from discipleship, learning from faith?
          What if what you BELIEVE about everything impacts what you THINK about anything?
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
        Classical Christian education (CCE) is a time-tested educational system which establishes a biblical worldview (called Paideia), incorporates methods based on natural phases of student development, cultivates the seven Christian Virtues, trains student reasoning through the Trivium (Grammar, Logic, and Rhetoric), and interacts with the historical Great Books.        `,
      }),
      build(Quote, {
        words: `
          Our curriculum does not include merely a list of great books, but a canon of literature formulated for the purpose of writing students into a narrative.
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
        ref: 'Luke 12:31',
        words: 'But seek His kingdom, and these things will be added to you.',
      },
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
        Academic rigor is a requisite emphasis in a school that
        compels students to work in all things as though unto the Lord
        `,
      }),
      build(Quote, {
        words: `
        Academic excellence is counted among that which is added to those who seek first His kingdom.
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
        ref: 'Psalms 19:1',
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
          Learning that leads students to love what they retain and continue in imaginative pursuit of the true and the real gives rise to contemplation of what is truly possible.
        `,
      }),
      build(Quote, {
        words: `
        Creative appropriation of retained knowledge is the cognitive calling card of the classically educated.
        `,
      }),
      build(Quote, {
        words: `
        When teachers radiate love for God and the material they teach in the presence of students they love, students will be moved to share in these affections because they love their teacher.
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
        The pursuit of knowledge is a unified enterprise that points us to our Creator God.
        `,
      }),
      build(Quote, {
        words: `
        The heroes of the Scientific Revolution believed as a presupposition that a perfect God had woven perfect mathematical harmonies into the world that reflected the truth of reality.
      `,
      }),
      build(Quote, {
        words: `
        If I remove THE way and THE truth and THE life from my thought processes, I am left hopelessly relying on "my truth" to navigate "my best life now" according to my own standard.
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
        His master said to him, ‘Well done, good and faithful servant. You have been faithful over a little; I will set you over much. Enter into the joy of your master.’
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
        We sow the seed and tend to the garden, then pray for the rain with faith that God will reap the harvest.
        `,
      }),
      build(Quote, {
        words: `
        With God as the standard, our goal is not to produce strict adherents to the standard in order for the school to run efficiently like a machine, but to bring students to love the standard so that Logos School becomes fruitful like a tree.
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

export const GOALS = [
  {
    line1: 'Cast students as characters in God’s story',
    line2:
      'by instilling the self-perception of one created in God’s image and in the context of His creation.',
  },
  {
    line1: 'Unmask the world’s spin on the story',
    line2:
      'by equipping students to discern, engage, and overcome worldly thinking with biblical thinking.',
  },
  {
    line1: 'Bring the story of God’s Kingdom to life in the eyes of students',
    line2:
      'by providing a clear model of the biblical Christian life through our staff and board.',
  },
  {
    line1: 'Intellectually justify the truth of the story',
    line2:
      'by teaching all subjects as parts of an integrated whole with the Scriptures at the center.',
  },
  {
    line1:
      'Inspire students to love the story, embrace their role, and get into character in pursuit of wisdom',
    line2: 'by loving the material and the students that we teach.',
  },
  {
    line1: 'Disciple students unto love for the author of salvation',
    line2: 'by facilitating maturation in the image of God.',
  },
];
