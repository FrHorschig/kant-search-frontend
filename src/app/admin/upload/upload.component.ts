import { Component } from '@angular/core';
import { HttpError, UploadService, Work, WorkUpload } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { ContainerComponent } from 'src/app/common/base/container.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent extends ContainerComponent {
  isLoading = false;
  workId = 0;

  constructor(
    private readonly messageService: MessageService,
    private readonly uploadService: UploadService
  ) {
    super();
  }

  setWorkId(work: Work) {
    this.workId = work.id;
  }

  onUpload(event: any, fileUploadBtn: any) {
    this.isLoading = true;
    const file = event.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      if (reader.result) {
        this.processText(reader.result.toString());
      }
    };
    reader.readAsText(file);
    fileUploadBtn.clear();
  }

  private processText(text: string) {
    const work: WorkUpload = {
      workId: this.workId,
      text: text,
    };
    this.postText(work);
  }

  private postText(work: WorkUpload) {
    this.messageService.clear();
    this.uploadService
      .uploadWork(work)
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
