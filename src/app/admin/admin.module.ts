import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BlockUIModule } from 'primeng/blockui';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AdminRoutingModule } from './admin-routing.module';
import { UploadComponent } from './upload/upload.component';
import { CommonModule as AppCommonModule } from '../common/common.module';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    TranslateModule.forChild(),
    BlockUIModule,
    FileUploadModule,
    InputTextModule,
    MessagesModule,
    TooltipModule,
    ProgressSpinnerModule,
    AppCommonModule,
    DialogModule,
  ],
})
export class AdminModule {}
