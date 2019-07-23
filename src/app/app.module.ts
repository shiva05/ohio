import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { CustomAccordionComponent } from './components/custom-accordion/custom-accordion.component';
import { FilterSummaryComponent } from './components/filter-summary/filter-summary.component';
import { ReportComponent } from './components/report/report.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TestService } from '../app/services/test.service';
// import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { testReducer } from './reducers/test.reducer';
import { advancedSearchReducer } from './reducers/advanced-search.reducer';
import { TestEffects } from './effects/test.effect';
import { AdvancedSearchEffects } from './effects/advanced-search.effect';
import { reportReducer } from './reducers/report.reducer';
import { ReportEffects } from './effects/report.effects';
// import ngx-translate and the http loader
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AlignmentSearchComponent } from './components/alignment-search/alignment-search.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { HomeComponent } from './components/home/home.component';
import { ExportComponent } from './components/export/export.component';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdvancedSearchComponent,
    CustomAccordionComponent,
    FilterSummaryComponent,
    ReportComponent,
    SearchResultsComponent,
    AlignmentSearchComponent,
    CourseSearchComponent,
    ReportListComponent,
    HomeComponent,
    ExportComponent,
    QuickSearchComponent
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
    StoreModule.forRoot({ test: testReducer, advancedSearch: advancedSearchReducer, report: reportReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 100, name: 'tng1' }),
    EffectsModule.forRoot([TestEffects, AdvancedSearchEffects, ReportEffects])

  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT(Ahead of Time) compilation (Translation Module)
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
