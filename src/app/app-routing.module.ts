import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickSearchComponent } from './components/quick-search/quick-search.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { MyAppComponent } from './components/my-app/my-app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'Search', component: SearchResultsComponent },
  { path: 'quickSearch', component: QuickSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'myApp', component: MyAppComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
