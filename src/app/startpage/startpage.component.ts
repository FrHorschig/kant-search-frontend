import { Component, OnInit } from '@angular/core';
import { ExampleService } from 'kant-search-api';
import { SmartComponent } from '../common/base/smart/smart.component';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
})
export class StartpageComponent extends SmartComponent implements OnInit {
  id: number | undefined;
  text: string | undefined;

  constructor(private readonly exampleService: ExampleService) {
    super();
  }

  ngOnInit() {
    this.exampleService
      .getText(1)
      .pipe(this.takeUntilDestroy())
      .subscribe((text) => {
        console.log(text);
        this.id = text.id;
        this.text = text.text;
      });
  }
}
