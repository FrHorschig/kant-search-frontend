import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'ks-hints',
  templateUrl: './hints.component.html',
  styleUrl: './hints.component.less',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NzGridModule,
    NzSpaceModule,
    NzCardModule,
  ],
})
export class HintsComponent {}
