import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { MyAppComponent } from './components/my-app/my-app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HomeComponent } from './components/home/home.component';
import { AlignmentSearchComponent } from './components/alignment-search/alignment-search.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { ExportComponent } from './components/export/export.component';
import { FilterSummaryComponent } from './components/filter-summary/filter-summary.component';
import { ReportComponent } from './components/report/report.component';
import { CourseSearchReportComponent } from './components/course-search-report/course-search-report.component';

const routes: Routes = [
  //{ path: '', component: MainComponent },
  //{ path: 'main', component: HomeComponent },
  //{ path: 'Search', component: SearchResultsComponent },
  //{ path: 'quickSearch', component: QuickSearchComponent },
  //{ path: 'login', component: LoginComponent },
  //{ path: 'myApp', component: MyAppComponent },
  //{ path: '**', component: PageNotFoundComponent },

   { path: '', redirectTo: 'Home', pathMatch: 'full' },
   {
     path: '', component: MainComponent,
     children: [
       {
         path: 'Home',
         component: HomeComponent
       }
     ]
   },
     {
     path: 'AlignmentSearch',
     component: AlignmentSearchComponent
   },
     {
       path: 'AlignmentSearchResults',
       component: FilterSummaryComponent
     },
     {
       path: 'AlignmentSearchReport',
       component: ReportComponent
     },
  
   {
     path: 'CourseSearch',
     component: CourseSearchComponent
     },
     {
       path: 'CourseSearchResults',
       component: FilterSummaryComponent
     },
     {
       path: 'CourseSearchReport',
       component: CourseSearchReportComponent
     },
  
   {
     path: 'DataImport',
     component: ExportComponent
     },
   {
     path: 'quickSearch',
     component: QuickSearchComponent
   }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
