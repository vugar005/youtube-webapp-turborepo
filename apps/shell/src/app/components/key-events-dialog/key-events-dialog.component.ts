import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KeyEventOptions } from './key-events-dialog.constants';

@Component({
  selector: 'yt-key-events-dialog',
  templateUrl: './key-events-dialog.component.html',
  styleUrls: ['./key-events-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyEventsDialogComponent {
  public readonly keyEventOptinos = KeyEventOptions;
}
