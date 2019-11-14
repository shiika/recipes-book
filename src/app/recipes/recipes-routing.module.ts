import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from './recipe-resolver.service';

const routes: Routes = [
  {
    path: "",
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "", component: PlaceholderComponent, pathMatch: "full" },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id/detail",
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class RecipesRoutingModule {}