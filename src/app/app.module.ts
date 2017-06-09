import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {RouteModule} from "./app-routing.module";
import {NewRecipeComponent} from "./new-recipe/new-recipe.component";
import {RouterModule} from "@angular/router";
import {TranslateLoader, TranslateModule, TranslateService, TranslateStaticLoader} from "ng2-translate";
import {
  AutoCompleteModule, ButtonModule, CheckboxModule, DialogModule, DropdownModule, InputTextareaModule,
  InputTextModule, TreeModule
} from "primeng/primeng";
import {IngredientsComponent} from './ingredients/ingredients.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NewRecipeComponent,
    IngredientsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    RouteModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    AutoCompleteModule,
    DialogModule,
    TreeModule
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
