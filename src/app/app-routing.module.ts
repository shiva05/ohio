import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { MainComponent } from './components/main/main.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  { path: 'quickSearch', component: QuickSearchComponent },
  { path: 'main', component: MainComponent },
  { path: 'Search', component: SearchResultsComponent },
  { path: '', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
