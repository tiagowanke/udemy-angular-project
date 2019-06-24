import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged$ = new Subject<Recipe[]>();

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    // new Recipe('Tasty Schnitzel',
    //   'A super-tasty Schnitzel - just awesome!',
    //   'https://thestayathomechef.com/wp-content/uploads/2018/03/German-Schnitzel-4-small.jpg',
    //   [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('French Fries', 20)
    //   ]),
    // new Recipe('Big Fat Burger',
    //   'What else you need to say?',
    //   'https://sanpagourmet.com/wp-content/uploads/2018/04/burguer-mexicano-820x570.png',
    //   [
    //     new Ingredient('Buns', 2),
    //      new Ingredient('Meat', 1)
    //   ])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged$.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged$.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.recipesChanged$.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged$.next(this.recipes.slice());
  }

}
