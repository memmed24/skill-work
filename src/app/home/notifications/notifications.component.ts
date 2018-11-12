import { SoundService } from './../services/sound.service';
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
    private nsService: NofiticationsService,
    private audioService: SoundService
  ) { 
    this.socket = io('http://localhost:8000');
  }

  ngOnInit() {
    this.nofitication_types = this.nsService.notifications.types;
    this.fetchAll();
    this.socket.on('notification/1', (data) => {
      if(data) {
        this.audioService.notification();
        this.notifications.unshift(data);
      }
    });
  }

  onClick() {
    let text = "text message";
    this.socket.emit("message", text);
  }

  fetchAll(): void {
    this.nsService.getAll().subscribe((data) => {
      this.notifications = new Array;
      this.notifications = data.json();
      console.log(this.notifications);

    }, (error) => {
      console.log("error ", error);
    });
  }

}
