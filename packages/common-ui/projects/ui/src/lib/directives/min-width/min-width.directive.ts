import { ChangeDetectorRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Directive({
  standalone: true,
  selector: '[ytdMinWidth]',
})
export class MinWidthDirective implements OnInit {
  @Input() ytdMinWidth?: string;

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
    this.breakpointObserver.observe([`(min-width: ${this.ytdMinWidth})`]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.cdr.detectChanges();
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
