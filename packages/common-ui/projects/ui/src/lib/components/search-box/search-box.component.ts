import { CommonModule } from '@angular/common';
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
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { catchError, debounceTime, EMPTY, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { IYoutubeService } from '../../models';
import { IYoutubeSearchItem, IYoutubeSearchResult } from '../../models/youtube-search-list.model';
import { YOUTUBE_SERVICE } from '../../tokens';

@Component({
  standalone: true,
  selector: 'ytd-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
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
  public searchControl = new UntypedFormControl();
  public searchOptions?: IYoutubeSearchItem[] = [];

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
      this.searchControl.enable({ emitEvent: false });
    } else if (isDisabled) {
      this.searchControl.disable({ emitEvent: false });
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
        filter((text: string) => !!text),
        switchMap((text: string) => this.getSearchRequest({ query: text })),
        takeUntil(this.onDestroy$)
      )
      .subscribe((results: IYoutubeSearchResult) => {
        this.searchOptions = results?.items;
        this.cdr.detectChanges();
      });
  }

  private getSearchRequest(payload: { query: string }): Observable<IYoutubeSearchResult> {
    return this.youtubeService.searchList(payload).pipe(catchError(() => EMPTY));
  }
}
