import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { WebApiService } from '../../services';

@Directive({
  selector: '[ytAspectRatio]',
})
export class AspectRatioDirective implements AfterViewInit, OnDestroy {
  @Input() ytAspectRatio?: number;

  private readonly onDestroy$ = new Subject<void>();

  constructor(private element: ElementRef, private renderer: Renderer2, private webApiService: WebApiService) {}

  public ngAfterViewInit(): void {
    this.setDimensions();
    this.initResizeListeners();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private setDimensions(): void {
    if (!this.ytAspectRatio) {
      return;
    }
    const width = this.element.nativeElement.clientWidth;
    this.renderer.setStyle(this.element.nativeElement, 'height', `${width * this.ytAspectRatio}px`);
  }

  private initResizeListeners(): void {
    fromEvent(this.webApiService.window, 'resize')
      .pipe(debounceTime(100), takeUntil(this.onDestroy$))
      .subscribe(() => this.setDimensions());
  }
}
