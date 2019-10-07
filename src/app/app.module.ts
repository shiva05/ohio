import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpLoadInterceptor } from './services/http.interceptor';
import { DatePipe } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { QuickSearchEffects } from 'src/app/effects/quick-search.effect';
import { AdvancedSearchEffects } from './effects/advanced-search.effect';
import { SearchResultEffects } from './effects/search-result.effect';
import { CourseSearchEffects } from './effects/course-search.effect';
import { ReportEffects } from './effects/report.effects';

import { AppHttpService } from './services/app-http.service';
import { AuthEffectsService } from './effects/auth-effects';
import { ClaimsEffectsService } from './effects/claims-effects';
import { AuthService } from './services/auth.service';
import { FlagService } from './services/flag.service';
import { DocsService } from './services/docs.service';
import { LoaderService } from '../app/services/loader.service';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { ClaimsService } from './services/claims.service';
import { MenubarComponent } from './components/menubar/menubar.component';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { AlignmentSearchComponent } from './components/alignment-search/alignment-search.component';
import { FilterSummaryComponent } from './components/filter-summary/filter-summary.component';
import { AlignmentSearchFiltersComponent } from './components/alignment-search-filters/alignment-search-filters';
import { CustomAccordionComponent } from './components/custom-accordion/custom-accordion.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ReportComponent } from './components/report/report.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { CourseSearchFiltersComponent } from './components/course-search-filters/course-search-filters.component';
import { CourseSearchAccordionComponent } from './components/course-search-accordion/course-search-accordion.component';
import { CourseSearchReportComponent } from './components/course-search-report/course-search-report.component';
import { CourseSearchReportListComponent } from './components/course-search-report-list/course-search-report-list.component';
import { ReportModalComponent } from './components/report-modal/report-modal.component';

import { ExportComponent } from './components/export/export.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { MyAppComponent } from './components/my-app/my-app.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthOrchestration } from './services/auth-orchestration.service';
import { InteropService } from 'src/app/services/interop.service';
import { Reducers } from './reducers/index';
import { UtilityComponent} from './components/utility/utility.component';
import { UtilitynavComponent } from './components/utilitynav/utilitynav.component';
import { DocsComponent } from './components/utilities/docs/docs.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { ListDocsComponent } from './components/utilities/docs/list-docs/list-docs.component';
import { PreviewDocsComponent } from './components/utilities/docs/preview-docs/preview-docs.component';
import { CookieService } from 'ngx-cookie-service';
import { FileNameDirective } from './directives/fileNameDirective';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomAccordionComponent,
    FilterSummaryComponent,
    ReportComponent,
    AlignmentSearchComponent,
    CourseSearchComponent,
    ReportListComponent,
    HomeComponent,
    ExportComponent,
    QuickSearchComponent,
    MainComponent,
    LoginComponent,
    MyAppComponent,
    PageNotFoundComponent,
    AlignmentSearchFiltersComponent,
    CourseSearchFiltersComponent,
    SearchResultsComponent,
    LoadingSpinnerComponent,
    CourseSearchReportComponent,
    CourseSearchReportListComponent,
    CourseSearchAccordionComponent,
    MenubarComponent,
    UtilityComponent,
    UtilitynavComponent,
    DocsComponent,
    AlertMessageComponent,
    PreviewDocsComponent,
    ListDocsComponent,
    ReportModalComponent,
    FileNameDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(Reducers),
    StoreDevtoolsModule.instrument({ maxAge: 100, name: 'tng1' }),
    EffectsModule.forRoot([AdvancedSearchEffects, ReportEffects, QuickSearchEffects, SearchResultEffects, CourseSearchEffects, AuthEffectsService, ClaimsEffectsService])

  ],
  providers: [
    DatePipe,
    AuthService,
    InteropService,
    ClaimsService,
    AuthOrchestration,
    AppHttpService,
    CookieService,
    LoaderService,
    FlagService,
    DocsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT(Ahead of Time) compilation (Translation Module)
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
