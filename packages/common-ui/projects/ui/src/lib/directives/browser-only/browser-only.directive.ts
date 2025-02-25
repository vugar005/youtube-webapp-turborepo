import { Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Directive({
  standalone: true,
  selector: '[ytdBrowserOnly]',
})
export class BrowserOnlyDirective implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, //eslint-disable-line
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    if (!isPlatformServer(this.platformId)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
