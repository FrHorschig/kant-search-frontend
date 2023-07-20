import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BlockUIModule } from 'primeng/blockui';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AdminRoutingModule } from './admin-routing.module';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AdminRoutingModule,
    BlockUIModule,
    FileUploadModule,
    MessagesModule,
    ProgressSpinnerModule,
  ],
})
export class AdminModule {}
