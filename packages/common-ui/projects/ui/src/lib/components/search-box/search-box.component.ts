import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  forwardRef,
  ChangeDetectorRef,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { catchError, debounceTime, EMPTY, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { IYoutubeService } from '../../models';
import { IYoutubeSearchResult } from '../../models/youtube-search-list.model';
import { YOUTUBE_SERVICE } from '../../tokens';

@Component({
  selector: 'yt-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBoxComponent),
      multi: true,
    },
  ],
})
export class SearchBoxComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('searchInput', { static: true }) searchInputRef?: ElementRef;
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete?: MatAutocompleteTrigger;

  @Input() placeholder = 'Search';
  @Input() debounceTime = 200;
  public searchControl = new FormControl();
  public searchOptions: IYoutubeSearchResult[] = [];

  private readonly onDestroy$ = new Subject<void>();

  constructor(@Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.initFormListeners();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  // Implemented as part of ControlValueAccessor
  // eslint-disable-next-line
  public onChange(newVal: string): void {}

  // Implemented as part of ControlValueAccessor
  // eslint-disable-next-line
  public onTouched(_?: any): void {}

  // Implemented as part of ControlValueAccessor
  // eslint-disable-next-line
  public onValidatorChange(_?: any): void {}

  // Implemented as part of ControlValueAccessor
  public writeValue(value: string): void {
    this.searchControl.patchValue(value, { emitEvent: false });
  }

  // Implemented as part of ControlValueAccessor
  // eslint-disable-next-line
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Implemented as part of ControlValueAccessor
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor
  public registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  // Implemented as part of ControlValueAccessor
  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled === false) {
      this.searchControl.disable({ emitEvent: false });
    } else if (isDisabled) {
      this.searchControl.enable({ emitEvent: false });
    }
  }

  public onSubmit(): void {
    this.onChange(this.searchControl.value);
    this.inputAutoComplete?.closePanel();
  }

  public onOptionSelected(): void {
    this.onChange(this.searchControl.value);
    setTimeout(() => {
      this.searchInputRef?.nativeElement.blur();
    }, 0);
  }

  public onFocusInput(): void {
    this.inputAutoComplete?.openPanel();
  }

  private initFormListeners(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        switchMap((text: string) => this.getSearchRequest({ query: text })),
        takeUntil(this.onDestroy$)
      )
      .subscribe((results: IYoutubeSearchResult[]) => {
        this.searchOptions = results;
        this.cdr.detectChanges();
      });
  }

  private getSearchRequest(payload: { query: string }): Observable<IYoutubeSearchResult[]> {
    return this.youtubeService.searchVideoResults(payload).pipe(catchError(() => EMPTY));
  }
}
