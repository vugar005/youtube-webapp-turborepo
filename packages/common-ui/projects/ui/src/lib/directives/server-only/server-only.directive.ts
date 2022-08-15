import { Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Directive({
  standalone: true,
  selector: '[ytdServerOnly]',
})
export class ServerOnlyDirective implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, //eslint-disable-line
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
