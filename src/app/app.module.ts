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
import { DatePipe } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { AdvancedSearchEffects } from './effects/advanced-search.effect';
import { SearchResultEffects } from './effects/search-result.effect';
import { ReportEffects } from './effects/report.effects';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AlignmentSearchComponent } from './components/alignment-search/alignment-search.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { HomeComponent } from './components/home/home.component';
import { ExportComponent } from './components/export/export.component';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { AlignmentSearchFiltersComponent } from './components/alignment-search-filters/alignment-search-filters';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { MyAppComponent } from './components/my-app/my-app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuickSearchEffects } from 'src/app/effects/quick-search.effect';
import { CourseSearchFiltersComponent } from './components/course-search-filters/course-search-filters.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CourseSearchEffects } from './effects/course-search.effect';
import { AuthEffectsService } from './effects/auth-effects';
import { ClaimsEffectsService } from './effects/claims-effects';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CourseSearchReportComponent } from './components/course-search-report/course-search-report.component';
import { CourseSearchReportListComponent } from './components/course-search-report-list/course-search-report-list.component';
import { CourseSearchAccordionComponent } from './components/course-search-accordion/course-search-accordion.component';
import { AuthService } from './services/auth.service';
import { FlagService } from './services/flag.service';
import { DocsService } from './services/docs.service';

import { ClaimsService } from './services/claims.service';
import { AuthOrchestration } from './services/auth-orchestration.service';
import { AppHttpService } from './services/app-http.service';
import { MenubarComponent } from './components/menubar/menubar.component';
import { InteropService } from 'src/app/services/interop.service';
import { Reducers } from './reducers/index';

import { UtilityComponent} from './components/utility/utility.component';
import {UtilitynavComponent } from './components/utilitynav/utilitynav.component';
import {DocsComponent } from './components/utilities/docs/docs.component';
import {FlagsComponent } from './components/utilities/flags/flags.component';
import {FlagsOverviewComponent } from './components/utilities/flags-overview/flags-overview.component';
import {CommentsOverviewComponent } from './components/utilities/comments-overview/comments-overview.component';
import {ContactsComponent } from './components/utilities/contacts/contacts.component';
import {HistoryComponent } from './components/utilities/history/history.component';
import {CommentComponent } from './components/utilities/comments/comment/comment.component';
import {CommentsContainerComponent } from './components/utilities/comments/comments-container/comments-container.component';
import {AlertMessageComponent } from './components/alert-message/alert-message.component';
import {AddDocsComponent } from './components/utilities/docs/add-docs/add-docs.component';
import { ImportDocsComponent } from './components/utilities/docs/import-docs/import-docs.component';
import { ListDocsComponent } from './components/utilities/docs/list-docs/list-docs.component';
import { PreviewDocsComponent } from './components/utilities/docs/preview-docs/preview-docs.component';
import { FileDraggableComponent } from './components/utilities/docs/file-draggable/file-draggable.component';


import { CardComponent } from './components/utilities/comments/card/card.component';
import { CommenterComponent } from './components/utilities/comments/commenter/commenter.component';
import { MessageEditorComponent } from './components/utilities/comments/message-editor/message-editor.component';
import { NewSubjectComponent } from './components/utilities/comments/new-subject/new-subject.component';
import { SubjectComponent } from './components/utilities/comments/subject/subject.component';
import { NewCommentComponent } from './components/utilities/comments/new-comment/new-comment.component';
import { HistoryDocsComponent } from './components/utilities/docs/history-docs/history-docs.component';
import { CookieService } from 'ngx-cookie-service';

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
    FlagsComponent,
    FlagsOverviewComponent,
    CommentsOverviewComponent,
    ContactsComponent,
    HistoryComponent,
    CommentComponent,
    CommentsContainerComponent,
    AlertMessageComponent,
    AddDocsComponent,
    ImportDocsComponent,
    PreviewDocsComponent,
    ListDocsComponent,
    FileDraggableComponent,
    CardComponent,
    CommenterComponent,
    MessageEditorComponent,
    NewSubjectComponent,
    SubjectComponent,
    HistoryDocsComponent,
    NewCommentComponent
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
