import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {NewRecipeComponent} from "./new-recipe/new-recipe.component";

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'new-recipe'
  },
  {
    path: 'new-recipe',
    component: NewRecipeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
export class RouteModule {

}
