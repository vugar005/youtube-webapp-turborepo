import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'yt-policy-terms-dialog',
  templateUrl: './policy-terms-dialog.component.html',
  styleUrls: ['./policy-terms-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyTermsDialogComponent {
  constructor(private dialogRef: MatDialogRef<PolicyTermsDialogComponent>) {}

  public onDialogClose(value: boolean): void {
    this.dialogRef.close(value);
  }
}
