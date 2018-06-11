import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Player } from '../../models/player';

@Component({
  selector: 'soccer-player-selection-dialog',
  templateUrl: './player-selection-dialog.component.html',
  styleUrls: ['./player-selection-dialog.component.css']
})
export class PlayerSelectionDialog {

  constructor(public dialogRef: MatDialogRef<PlayerSelectionDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  public select(player: Player): void {
    this.dialogRef.close(player);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

}
