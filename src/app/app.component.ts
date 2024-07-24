import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  public title = '';

  @ViewChild(MatSidenav) sidenav: MatSidenav = <any>null;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Seta o título dinamicamente no Header ao trocar de rota
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.route))
      .pipe(
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
      )
      .pipe(switchMap((route) => route.data))
      .subscribe((event) => this.title = event['titulo']);
  }

  public navigate(myRoute: string) {
    this.sidenav?.toggle();
    this.router.navigate([myRoute]);
  }

}
