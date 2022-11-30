import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { KeyEventOptions } from './key-events-dialog.constants';

@Component({
  standalone: true,
  selector: 'yt-key-events-dialog',
  templateUrl: './key-events-dialog.component.html',
  styleUrls: ['./key-events-dialog.component.scss'],
  imports: [MatIconModule, CommonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyEventsDialogComponent {
  public readonly keyEventOptinos = KeyEventOptions;
}
