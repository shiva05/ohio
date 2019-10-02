import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { AlignmentSearchComponent } from './components/alignment-search/alignment-search.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { ExportComponent } from './components/export/export.component';
import { FilterSummaryComponent } from './components/filter-summary/filter-summary.component';
import { ReportComponent } from './components/report/report.component';
import { CourseSearchReportComponent } from './components/course-search-report/course-search-report.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: '', component: MainComponent, children: [
      { path: 'Home', component: HomeComponent }]
  },
  { path: 'alignmentsearch', component: AlignmentSearchComponent },
  { path: 'AlignmentSearchResults', component: FilterSummaryComponent },
  { path: 'AlignmentSearchReport', component: ReportComponent },
  { path: 'coursesearch', component: CourseSearchComponent },
  { path: 'CourseSearchResults', component: FilterSummaryComponent },
  { path: 'CourseSearchReport', component: CourseSearchReportComponent },
  { path: 'DataImport', component: ExportComponent },
  { path: 'quickSearchapp', component: QuickSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
