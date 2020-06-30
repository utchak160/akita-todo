import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {
  }

  success(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 1500,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  error(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
