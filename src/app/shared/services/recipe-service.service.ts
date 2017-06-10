import {Injectable} from '@angular/core';
import {IRecipe} from "../interfaces/recipe";
import {Http} from "@angular/http";
import {IIngredient} from "../interfaces/ingredient";

@Injectable()
export class RecipeService {

  constructor(private http: Http) {
  }

  addRecipe(recipe: any, ingredients: IIngredient[]) {
    console.log(recipe);
    console.log(ingredients);
    return this.http.post('api/recipes/add', {recipe: recipe, ingredients: ingredients}).map(res => res.json());
  }

  getCategories() {
    return this.http.get(`api/recipes/categories`).map(res => res.json());
  }
}
