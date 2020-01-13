import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { saveAs } from 'file-saver'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public socket: Socket) { }


  fileChangeEvent(file) {
    debugger;
    console.log("files[0] ==>"+file.target.files[0]);
    console.log("files[1] ==>"+file.target.files[1])

    var fileReader = new FileReader(),
     slice = file.target.files[0].slice(0, 100000); 


    this.socket.on('request slice upload', (data) => { 
      console.log("request slice upload !!!!!!!!!!!!")
      var fileReaderNew = new FileReader();
        var place = data.currentSlice * 100000, 
            sliceNew = file.target.files[0].slice(place, place + Math.min(100000, file.target.files[0].size - place)); 
        
            fileReaderNew.readAsArrayBuffer(sliceNew); 
            fileReaderNew.onload = (evt) => {
              var arrayBufferNew = fileReaderNew.result; 
              this.socket.emit('set-name', { 
                  name: file.target.files[0].name, 
                  type: file.target.files[0].type, 
                  size: file.target.files[0].size, 
                  data: arrayBufferNew 
              }); 
          }
    });

    fileReader.readAsArrayBuffer(slice); 
    fileReader.onload = (evt) => {
        var arrayBuffer = fileReader.result; 
        this.socket.emit('set-name', { 
            name: file.target.files[0].name, 
            type: file.target.files[0].type, 
            size: file.target.files[0].size, 
            data: arrayBuffer 
        }); 
    }
    
  }


  


  
  async ngOnInit() {
    this.socket.connect();
 

    //const gzipper = new Gzipper('../../assets/DSC_0023.jpg', "../../assets/");

    var urls = [
      // "images/20170420_145140.jpg", 
      // "images/20170503_142841.jpg", 
      // "images/20170503_084035.jpg", 
      // "images/20170503_163354.jpg", 
      // "images/20170503_163334.jpg",
      //"../../assets/Battleship.2012.BluRay.1080p.x264.YIFY.mp4", 
      //"../../assets/DSC_0023.JPG"
    ];
      
 
    // this.socket.fromEvent('users-changed').subscribe(data => {
    //   console.log("From SERVER ====>"+data)
      
    // });
 
    // this.socket.fromEvent('message').subscribe(message => {
      
    // });
  }


  
  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
