import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../header/data-storage.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../shared/recipe.model';

@Injectable({
    providedIn: 'root'
})

export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dService: DataStorageService) {}
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
            console.log("resolved!");
            return this.dService.fetchData()
        }
}