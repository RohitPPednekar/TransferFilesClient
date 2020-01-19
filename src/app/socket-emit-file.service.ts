import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketEmitFileService {

  constructor(public socket: Socket) { }


  fileChangeEvents(fileDetailsShare){

    this.socket.emit('set-name', fileDetailsShare); 
  };
}
