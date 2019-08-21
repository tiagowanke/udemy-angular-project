import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';

@Component({
  selector: 'udemy-project-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticate = false;
  private destroy$ = new Subject<void>();

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.authService.user
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => this.isAuthenticate = !!user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe((response: Response) => {
        console.log(response);
      });
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((recipes: Recipe[]) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      });
  }

  onLogout() {
    this.authService.logout();
  }

}
