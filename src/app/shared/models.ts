import { build } from '@caiu/library';

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
  build(MenuItem, {
    label: 'Instruction',
    routerLink: '/academics',
    queryParams: {
      view: 'instruction',
    },
  }),
  build(MenuItem, {
    label: 'Accreditation (ACCS)',
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
    routerLink: '/admissions',
    queryParams: {
      view: 'visit',
    },
  }),
  build(MenuItem, {
    label: 'Application',
    routerLink: '/admissions',
    queryParams: {
      view: 'application',
    },
  }),
];
export const CONTACT_SUBMENU: MenuItem[] = [
  build(MenuItem, {
    label: 'Enroll',
    routerLink: '/contact',
    queryParams: {
      view: 'enroll',
    },
  }),
  build(MenuItem, {
    label: 'Volunteer',
    routerLink: '/contact',
    queryParams: {
      view: 'volunteer',
    },
  }),
];
