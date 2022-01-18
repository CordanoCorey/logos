import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import {
  FormsModule,
  AccordionModule,
  DialogModule,
  PipesModule,
  WallpaperModule,
  FileUploadModule,
} from '@caiu/library';
import { MissionComponent } from './mission/mission.component';
import { VisionComponent } from './vision/vision.component';
import { ValuesComponent } from './values/values.component';
import { BeliefsComponent } from './beliefs/beliefs.component';
import { BibleVerseComponent } from './bible-verse/bible-verse.component';
import { GoalsComponent } from './goals/goals.component';
import { HeaderComponent } from './header/header.component';
import { CircleLinksComponent } from './circle-links/circle-links.component';
import { CloudsComponent } from './clouds/clouds.component';
import { FooterComponent } from './footer/footer.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SocialLinksComponent } from './social-links/social-links.component';
import { SplashComponent } from './splash/splash.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ContainerComponent } from './container/container.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { StatComponent } from './stat/stat.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ImageBannerComponent } from './image-banner/image-banner.component';
import { QuoteComponent } from './quote/quote.component';
import { MobileNotSupportedComponent } from './mobile-not-supported/mobile-not-supported.component';
import { OverlayComponent } from './overlay/overlay.component';
import { SlidesComponent } from './slides/slides.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ToggleArrowsComponent } from './toggle-arrows/toggle-arrows.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { MobileMainMenuComponent } from './mobile-main-menu/mobile-main-menu.component';
import { CarouselContentComponent } from './carousel/carousel-content.component';
import { CarouselContentDirective } from './carousel/carousel-content.directive';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BannerComponent } from './banner/banner.component';
import { ImagePreloadComponent } from './image-preload/image-preload.component';

@NgModule({
  declarations: [
    BeliefsComponent,
    BibleVerseComponent,
    GoalsComponent,
    HeaderComponent,
    MissionComponent,
    ValuesComponent,
    VisionComponent,
    CircleLinksComponent,
    CloudsComponent,
    FooterComponent,
    MainMenuComponent,
    SocialLinksComponent,
    SplashComponent,
    CarouselComponent,
    ContainerComponent,
    ComingSoonComponent,
    StatComponent,
    BarChartComponent,
    ImageBannerComponent,
    QuoteComponent,
    MobileNotSupportedComponent,
    OverlayComponent,
    SlidesComponent,
    FaqsComponent,
    ToggleArrowsComponent,
    SubMenuComponent,
    MobileMainMenuComponent,
    CarouselContentComponent,
    CarouselContentDirective,
    NavMenuComponent,
    BannerComponent,
    ImagePreloadComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule,
    DialogModule,
    DragDropModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    // NgxChartsModule,
    PipesModule,
    WallpaperModule,
    FileUploadModule,
  ],
  exports: [
    CommonModule,
    AccordionModule,
    CloudsComponent,
    DialogModule,
    DragDropModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatTreeModule,
    // NgxChartsModule,
    PipesModule,
    RouterModule,
    BannerComponent,
    BeliefsComponent,
    BibleVerseComponent,
    CarouselComponent,
    CarouselContentComponent,
    CarouselContentDirective,
    ComingSoonComponent,
    ContainerComponent,
    FaqsComponent,
    FooterComponent,
    GoalsComponent,
    HeaderComponent,
    ImageBannerComponent,
    ImagePreloadComponent,
    MainMenuComponent,
    MissionComponent,
    MobileNotSupportedComponent,
    NavMenuComponent,
    OverlayComponent,
    QuoteComponent,
    SlidesComponent,
    StatComponent,
    SubMenuComponent,
    ToggleArrowsComponent,
    ValuesComponent,
    VisionComponent,
  ],
})
export class SharedModule {}
