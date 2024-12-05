import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './layout/container/container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContainerComponent],
  template: '<app-container></app-container>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-management';
}
