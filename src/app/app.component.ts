import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AuthService } from './core/_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'bookcomet';

  constructor(
    private router: Router,
    private authService: AuthService
    ){ }

    
  ngOnInit(): void {
    this.authService.loadStoreUser();
    this.router.events.pipe(
      filter(event => 
        event &&
        event instanceof NavigationEnd &&
        event.url === '/logout'
        ),
      map(event => event as NavigationEnd),
      tap(() => this.authService.logout())
    ).subscribe();
  }
}
