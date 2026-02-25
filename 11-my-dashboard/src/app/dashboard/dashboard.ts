import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidemenu } from '@shared/sidemenu/sidemenu';


@Component({
  selector: 'app-dashboard',
  imports: [RouterModule,Sidemenu],
  templateUrl: './dashboard.html',

})
export default class Dashboard { }
