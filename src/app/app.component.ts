import { Component } from '@angular/core';
import { VolumesStore } from './common/store/volumes.store';
import { NavbarComponent } from './app/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'ks-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    NzFlexModule,
    NzSpaceModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private readonly volStore: VolumesStore) {
    this.volStore.loadData();
  }
}
