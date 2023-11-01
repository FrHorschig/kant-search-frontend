import { Component } from '@angular/core';
import { WorksMenuStore } from 'src/app/common/shared/works-menu-store/works-menu.store';
import { UploadStore } from './upload.store';
import { Work } from '@frhorschig/kant-search-api';

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

  toggleNode(key: string) {
    this.worksMenuStore.toggleNode(key);
  }

  onUpload(event: any, fileUploadBtn: any) {
    const file = event.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.uploadStore.upload(reader.result as string);
      }
    };
    reader.readAsText(file);
    fileUploadBtn.clear();
  }
}
