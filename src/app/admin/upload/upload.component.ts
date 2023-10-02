import { Component } from '@angular/core';
import { HttpError, UploadService, Work, WorkUpload } from 'kant-search-api';
import { MessageService } from 'primeng/api';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { WorksMenuStore } from 'src/app/common/shared/works-menu-store/works-menu.store';
import { UploadStore } from './upload.store';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  providers: [WorksMenuStore, UploadStore],
})
export class UploadComponent {
  nodes$ = this.worksMenuStore.nodes$;
  hasWorkId$ = this.uploadStore.hasWorkId$;
  isLoading$ = this.uploadStore.isLoading$;

  showWorksMenu = false;

  constructor(
    private readonly worksMenuStore: WorksMenuStore,
    private readonly uploadStore: UploadStore
  ) {
    this.worksMenuStore.buildNodes(false);
  }

  onWorksChange(work: Work) {
    this.uploadStore.putWork(work);
    this.showWorksMenu = false;
  }

  onUpload(event: any, fileUploadBtn: any) {
    const file = event.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.uploadStore.upload(reader.result.toString());
      }
    };
    reader.readAsText(file);
    fileUploadBtn.clear();
  }
}
