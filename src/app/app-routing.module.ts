import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { PlaceholderComponent } from './recipes/placeholder/placeholder.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipe-resolver.service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { 
        path: 'recipes', 
        component: RecipesComponent, 
        children: [
            { path: '', component: PlaceholderComponent, pathMatch: 'full' },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id/detail', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
        ] },
    { path: 'shopping', component: ShoppingListComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],

    exports: [RouterModule]
})

export class AppRoutingModule {
    
}