import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { AlignmentSearchComponent } from './components/alignment-search/alignment-search.component';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { ExportComponent } from './components/export/export.component';
import { FilterSummaryComponent } from './components/filter-summary/filter-summary.component';
import { CourseSearchReportComponent } from './components/course-search-report/course-search-report.component';
import { AlignmentSearchReportComponent } from './components/alignment-search-report/alignment-search-report.component';

const routes: Routes = [
  { path: '', redirectTo: 'alignmentsearch', pathMatch: 'full' },
  { path: 'alignmentsearch', component: AlignmentSearchComponent },
  { path: 'AlignmentSearchResults', component: FilterSummaryComponent },
  { path: 'AlignmentSearchReport', component: AlignmentSearchReportComponent },
  { path: 'coursesearch', component: CourseSearchComponent },
  { path: 'CourseSearchResults', component: FilterSummaryComponent },
  { path: 'CourseSearchReport', component: CourseSearchReportComponent },
  { path: 'dataimport', component: ExportComponent },
  { path: 'quickSearchapp', component: QuickSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
