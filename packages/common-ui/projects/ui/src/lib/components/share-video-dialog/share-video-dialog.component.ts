import { Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'yt-share-video-dialog',
  templateUrl: './share-video-dialog.component.html',
  styleUrls: ['./share-video-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareVideoDialogComponent implements OnInit, OnDestroy {
  public currenVideoTime?: any;
  public videoUrl?: string;
  public videoUrlControl = new FormControl();
  public startTimeControl = new FormControl();

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
    this.videoUrlControl = new FormControl(videoUrl);
    this.videoUrlControl.disable();
    this.startTimeControl = new FormControl(false);
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
