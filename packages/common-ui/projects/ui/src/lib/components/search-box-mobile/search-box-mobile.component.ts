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
  selector: 'ytd-search-box-mobile',
  templateUrl: './search-box-mobile.component.html',
  styleUrls: ['./search-box-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBoxMobileComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class SearchBoxMobileComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('searchInput', { static: true }) searchInputRef?: ElementRef;
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete?: MatAutocompleteTrigger;

  @Input() placeholder = 'Search';
  @Input() debounceTime = 200;
  public searchControl = new UntypedFormControl();
  public searchOptions?: IYoutubeSearchItem[] = [];
  public isMobileSearchActive?: boolean;

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
  // eslint-disable-next-line
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
    this.closeDropdown();
  }

  public onClose(): void {
    this.closeDropdown();
  }

  public onSearchboxActivate(): void {
    this.isMobileSearchActive = true;
    this.searchInputRef?.nativeElement.focus();
  }

  public onOptionSelected(): void {
    this.onChange(this.searchControl.value);
    this.closeDropdown();
  }

  public onFocusInput(): void {
    this.inputAutoComplete?.openPanel();
  }

  public onReset(): void {
    this.searchControl.patchValue(null, { emitEvent: false });
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

  private closeDropdown(): void {
    this.isMobileSearchActive = false;
    this.inputAutoComplete?.closePanel();
  }
}
