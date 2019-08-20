import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Observable} from 'rxjs';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';


@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes(): Observable<any> {
    return this.http.put(`https://udemy-project-c2bbf.firebaseio.com/recipes.json`, this.recipeService.getRecipes());
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://udemy-project-c2bbf.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );

  }

}
