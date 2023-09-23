import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable()
export class ScrollService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  scrollToAnchor(anchor: string): void {
    setTimeout(() => {
      const targetElement = document.getElementById(anchor);
      if (targetElement) {
        this.renderer.selectRootElement(targetElement).scrollIntoView();
      }
    }, 100);
  }
}
