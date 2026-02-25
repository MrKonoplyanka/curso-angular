import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from "@angular/router";


@Component({
  selector: 'app-sidemenu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidemenu.html',
})
export class Sidemenu {

  public menuItems = routes
    .map(route => route.children ?? [])
    .flat()
    .filter(route => route && route.path)
    .filter(route => !route.path?.includes(':'));
  constructor(){

  }
}
