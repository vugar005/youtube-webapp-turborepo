import { ChangeDetectorRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Directive({
  standalone: true,
  selector: '[ytdMaxWidth]',
})
export class MaxWidthDirective implements OnInit {
  @Input() ytdMaxWidth?: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.initBreakpointObserver();
  }

  private initBreakpointObserver(): void {
    this.breakpointObserver.observe([`(max-width: ${this.ytdMaxWidth})`]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.cdr.detectChanges();
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
