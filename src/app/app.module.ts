import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CustomAccordionComponent } from './components/custom-accordion/custom-accordion.component';
import { FilterSummaryComponent } from './components/filter-summary/filter-summary.component';
import { ReportComponent } from './components/report/report.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoaderService } from '../app/services/loader.service';
import { HttpLoadInterceptor } from './services/http.interceptor';
import { DatePipe } from '@angular/common'
// import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

import { advancedSearchReducer } from './reducers/advanced-search.reducer';
import { searchResultReducer } from './reducers/search-result.reducer';

import { AdvancedSearchEffects } from './effects/advanced-search.effect';
import { SearchResultEffects } from './effects/search-result.effect';
import { reportReducer } from './reducers/report.reducer';
import { ReportEffects } from './effects/report.effects';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AlignmentSearchComponent } from './components/alignment-search/alignment-search.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { HomeComponent } from './components/home/home.component';
import { ExportComponent } from './components/export/export.component';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { AlignmentSearchFiltersComponent } from './components/alignment-search-filters/alignment-search-filters';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { MyAppComponent } from './components/my-app/my-app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuickSearchEffects } from 'src/app/effects/quick-search.effect';
import { quickSearchReducer } from 'src/app/reducers/quick-search.reducer';
import { CourseSearchFiltersComponent } from './components/course-search-filters/course-search-filters.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { courseSearchReducer } from './reducers/course-search.reducer';
import { CourseSearchEffects } from './effects/course-search.effect';
import { AuthEffectsService } from './effects/auth-effects';
import { ClaimsEffectsService } from './effects/claims-effects';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CourseSearchReportComponent } from './components/course-search-report/course-search-report.component';
import { CourseSearchReportListComponent } from './components/course-search-report-list/course-search-report-list.component';
import { CourseSearchAccordionComponent } from './components/course-search-accordion/course-search-accordion.component';
import { AuthService } from './services/auth.service';
import { ClaimsService } from './services/claims.service';
import { AuthOrchestration } from './services/auth-orchestration.service';
import { AppHttpService } from './services/app-http.service';
import { AuthReducer } from './reducers/auth-reducer';
import { ClaimsReducer } from './reducers/claims-reducer';
// import { AuthEffectsService } from './effects/auth-effects';

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
    CourseSearchAccordionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forRoot({ advancedSearch: advancedSearchReducer, report: reportReducer, quickSearch: quickSearchReducer, searchResult: searchResultReducer, courseSearch: courseSearchReducer, authState: AuthReducer, claimsReducer: ClaimsReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 100, name: 'tng1' }),
    EffectsModule.forRoot([AdvancedSearchEffects, ReportEffects, QuickSearchEffects, SearchResultEffects, CourseSearchEffects,AuthEffectsService,ClaimsEffectsService])

  ],
  providers: [
    DatePipe,
    AuthService,
    ClaimsService,
    AuthOrchestration,
    AppHttpService,
    LoaderService,
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
