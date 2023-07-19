import { Component } from '@angular/core';
import { HttpError, UploadService } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { SmartComponent } from 'src/app/common/base/smart.component';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  providers: [MessageService],
})
export class AddWorkComponent extends SmartComponent {
  isLoading = false;

  constructor(
    private readonly messageService: MessageService,
    private readonly uploadService: UploadService
  ) {
    super();
  }

  onUpload(event: any, fileUploadBtn: any) {
    this.isLoading = true;
    const file = event.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      if (reader.result) {
        this.sendText(reader.result.toString());
      }
    };
    reader.readAsText(file);
    fileUploadBtn.clear();
  }

  sendText(text: string) {
    this.messageService.clear();
    this.uploadService
      .postWork(text)
      .pipe(this.takeUntilDestroy())
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
          });
        },
        error: (err: HttpError) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `The work could not be uploaded: ${err.message}`,
          });
        },
      });
  }
}
