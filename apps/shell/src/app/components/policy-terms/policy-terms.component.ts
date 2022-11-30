import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PolicyTermsDialogComponent } from './policy-terms-dialog/policy-terms-dialog.component';

@Component({
  selector: 'yt-policy-terms',
  templateUrl: './policy-terms.component.html',
  styleUrls: ['./policy-terms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyTermsComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  public ngOnInit(): void {
    this.openPolicyTermsDialog();
  }

  private openPolicyTermsDialog(): void {
    const dialogRef = this.dialog.open(PolicyTermsDialogComponent, {
      maxWidth: '90vw',
      width: '670px',
      maxHeight: '90vh',
      autoFocus: false,
      disableClose: true,
      position: {
        top: '56px',
        bottom: '56px',
      },
    });

    dialogRef.afterClosed().subscribe((consent: boolean) => {
      if (consent) {
        this.router.navigateByUrl('/');
      }
    });
  }
}
