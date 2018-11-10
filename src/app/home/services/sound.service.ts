import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  private src: string = "../../../assets/audio/";
  constructor() { }

  notification(): void {
    let audio = new Audio();
    audio.src = "../../../assets/audio/notification.mp3";
    audio.load();
    audio.play();
  }

  success(): void {
    let audio = new Audio();
    audio.src = `${this.src}success.mp3`;
    audio.load();
    audio.play();
  }

  error(): void {
    let audio = new Audio();
    audio.src = `${this.src}error.mp3`;
    audio.load();
    audio.play();
  }
}
