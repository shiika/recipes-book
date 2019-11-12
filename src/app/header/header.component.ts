import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Recipe } from '../shared/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(
    private dataService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.userAuthentication.subscribe(
      user => {
        this.isAuthenticated = !!user;
        console.log(this.isAuthenticated);
      }
    );
  }

  onSaveData() {
      this.dataService.saveData();
  }

  onLogout() {
    this.authService.logout();
  }

  onFetchData() {
      this.dataService.fetchData().subscribe(
        (user: Recipe[]) => {
          console.log(user);
        }
      );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
