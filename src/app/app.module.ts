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
import { LoaderInterceptor } from './services/http.interceptor';

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
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

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
    LoadingSpinnerComponent
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
    StoreModule.forRoot({ advancedSearch: advancedSearchReducer, report: reportReducer, quickSearch: quickSearchReducer, searchResult: searchResultReducer, courseSearch: courseSearchReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 100, name: 'tng1' }),
    EffectsModule.forRoot([AdvancedSearchEffects, ReportEffects, QuickSearchEffects, SearchResultEffects, CourseSearchEffects])

  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
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
