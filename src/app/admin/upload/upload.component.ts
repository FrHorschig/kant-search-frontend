import { Component } from '@angular/core';
import { HttpError, UploadService, Work, WorkUpload } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { SmartComponent } from 'src/app/common/base/smart.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent extends SmartComponent {
  isLoading = false;

  title = '';
  abbrev = '';
  volume: number | undefined;
  ordinal: number | undefined;
  year: number | undefined;

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
        this.processText(reader.result.toString());
      }
    };
    reader.readAsText(file);
    fileUploadBtn.clear();
  }

  processText(text: string) {
    const work: WorkUpload = {
      title: this.title,
      abbreviation: this.abbrev,
      text: text,
      volume: +(this.volume || 0),
      ordinal: +(this.ordinal || 0),
      year: +(this.year || 0),
    };
    this.postText(work);
    this.resetFields();
  }

  postText(work: WorkUpload) {
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

  resetFields() {
    this.title = '';
    this.abbrev = '';
    this.volume = undefined;
    this.ordinal = undefined;
    this.year = undefined;
  }
}
