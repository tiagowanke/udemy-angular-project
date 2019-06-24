import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/directive/placeholder.directive';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'udemy-project-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;

      this.isLoading = true;
      const authObs = this.isLoginMode ?
        this.authService.login(email, password) :
        this.authService.signup(email, password);

      authObs.subscribe((resData) => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (errorMessage: string) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        });

      form.reset();
    }
  }

  onHandleError(): void {
    this.error = null;
  }

  private showErrorAlert(message: string): void {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    componentRef.instance.close
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        hostViewContainerRef.clear();
      });
  }

}
