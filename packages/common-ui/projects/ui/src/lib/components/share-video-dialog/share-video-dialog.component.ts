import { Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SecondsToTimePipe } from '../../pipes';

@Component({
  standalone: true,
  selector: 'ytd-share-video-dialog',
  templateUrl: './share-video-dialog.component.html',
  styleUrls: ['./share-video-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatIconModule,
    ClipboardModule,
    SecondsToTimePipe,
    ReactiveFormsModule,
  ],
})
export class ShareVideoDialogComponent implements OnInit, OnDestroy {
  public currenVideoTime?: any;
  public videoUrl?: string;
  public videoUrlControl = new UntypedFormControl();
  public startTimeControl = new UntypedFormControl();

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { currenVideoTime: number; videoUrl: string },
    private clipboard: Clipboard
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.initFormListeners();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onCopyUrl(): void {
    const url: string = this.videoUrlControl.value;
    this.clipboard.copy(url);
  }

  private initForm(): void {
    const { currenVideoTime, videoUrl } = this.data;
    this.currenVideoTime = currenVideoTime;
    this.videoUrl = videoUrl;
    this.videoUrlControl = new UntypedFormControl(videoUrl);
    this.videoUrlControl.disable();
    this.startTimeControl = new UntypedFormControl(false);
  }

  private initFormListeners(): void {
    this.startTimeControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((value: boolean) => {
      if (value) {
        const time = Math.round(this.currenVideoTime);
        this.videoUrlControl.patchValue(`${this.videoUrl}&t=${time}`);
      } else {
        this.videoUrlControl.patchValue(`${this.videoUrl}`);
      }
    });
  }
}
