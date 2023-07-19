import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BlockUIModule } from 'primeng/blockui';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UploadRoutingModule } from './upload-routing.module';
import { AddWorkComponent } from './add-work/add-work.component';

@NgModule({
  declarations: [AddWorkComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    UploadRoutingModule,
    BlockUIModule,
    FileUploadModule,
    MessagesModule,
    ProgressSpinnerModule,
  ],
})
export class UploadModule {}
