import {Component} from '@angular/core';
import {ConnectionService} from 'ng-connection-service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  status = true;
  isConnected = true;
  disconnected = false;
  update = false;

  constructor(private connectionService: ConnectionService, public dialog: MatDialog) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = true;
        if (this.disconnected) {
          this.update = true;
        }
        this.disconnected = false;
        setTimeout(() => {
          this.update = false;
        }, 3000);
        this.dialog.closeAll();
      } else {
        this.status = false;
        this.disconnected = true;
        this.openDialog();
      }
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ConnectionDialogComponent, {
      width: '250px',
      data: {}
    });
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './connection.dialog.html',
})
export class ConnectionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConnectionDialogComponent>) {
  }

}
