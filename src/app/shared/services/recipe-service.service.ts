import {Injectable} from '@angular/core';
import {IRecipe} from "../interfaces/recipe";
import {Http} from "@angular/http";

@Injectable()
export class RecipeService {

  constructor(private http: Http) {
  }

  addRecipe(recipe: IRecipe) {
    console.log(recipe);
    // this.http.post('api/addRecipe', recipe);
  }

  getCategories() {
    return this.http.get(`api/recipes/categories`).map(res => res.json());
  }
}
