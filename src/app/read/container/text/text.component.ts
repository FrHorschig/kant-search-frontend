import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from 'src/app/common/base/container.component';
import { ActivatedRoute } from '@angular/router';
import { TextStore } from './text.store';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  providers: [TextStore],
})
export class TextComponent implements OnInit {
  paragraphs$ = this.store.paragraphs$;
  isLoaded$ = this.store.isLoaded$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: TextStore
  ) {}

  ngOnInit(): void {
    const workId = this.route.snapshot.params['workId'] as number;
    this.store.loadParagraphs(workId);
  }
}
