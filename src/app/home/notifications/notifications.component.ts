import { NofiticationsService } from './../services/nofitications.service';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  socket: SocketIOClient.Socket;

  notifications: Array<any>;
  nofitication_types: Array<any>;
  @ViewChildren('messagebox') messageBox: ElementRef;

  constructor(
    private nsService: NofiticationsService
  ) { 
    this.socket = io('http://localhost:8000');
  }

  ngOnInit() {
    this.nofitication_types = this.nsService.notifications.types;
    this.fetchAll();
    this.socket.on('notification/1', (data) => {
      this.notifications.unshift(data);
    });
  }

  onClick() {
    let text = "text message";
    this.socket.emit("message", text);
  }

  fetchAll(): void {
    this.nsService.getAll().subscribe((data) => {
      this.notifications = new Array;
      console.log(data);
      this.notifications = data.json();
    }, (error) => {
      console.log("error ", error);
    });
  }

}
