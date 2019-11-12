import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipesService } from './recipes/recipes.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
        ShoppingListService,
        RecipesService,
    ]
})

export class CoreModule {}