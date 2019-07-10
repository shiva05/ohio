import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {HeaderComponent } from './components/header/header.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdvancedSearchComponent} from './components/advanced-search/advanced-search.component';
import { CustomAccordionComponent } from './components/custom-accordion/custom-accordion.component';
import { FilterSummaryComponent } from './components/filter-summary/filter-summary.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
// import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import {testReducer } from './reducers/test.reducer';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdvancedSearchComponent,
    CustomAccordionComponent,
    FilterSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    // StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forRoot({test: testReducer}),
    StoreDevtoolsModule.instrument({maxAge:100,name:'tng1'}),
    EffectsModule.forRoot([AppEffects])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
