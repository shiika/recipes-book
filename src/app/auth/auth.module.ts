import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";
import { AuthGuardService } from "./auth-guard.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { AuthService } from "./auth.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AuthComponent, AlertComponent, PlaceholderDirective],

  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([{ path: "", component: AuthComponent }])
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],

  entryComponents: [AlertComponent]
})
export class AuthModule {}
