import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';



interface SideMenuOption {
  label: string;
  sublabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuOptionsComponent {

  gifService = inject(GifService);

  menuOptions: SideMenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'The most popular gifs',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      sublabel: 'Find the best gifs',
      route: '/dashboard/search',
    }

  ];


}
