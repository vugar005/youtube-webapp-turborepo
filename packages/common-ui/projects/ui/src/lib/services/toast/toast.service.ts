import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastConfig } from './toast.service.models';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  // eslint-disable-next-line
  public open(config: ToastConfig): MatSnackBarRef<any> {
    switch (config.type) {
      case 'success':
        return this.openSuccessToast(config);
      case 'error':
        return this.openErrorToast(config);
      default:
        return this.openSuccessToast(config);
    }
  }

  // eslint-disable-next-line
  private openSuccessToast(config: ToastConfig): MatSnackBarRef<any> {
    const { message, action, duration = 4000 } = config;
    return this.snackBar.open(message, action, { duration, panelClass: 'success-toast' });
  }

  // eslint-disable-next-line
  private openErrorToast(config: ToastConfig): MatSnackBarRef<any> {
    const { message, action, duration = 4000 } = config;
    return this.snackBar.open(message, action, { duration, panelClass: 'error-toast' });
  }
}
