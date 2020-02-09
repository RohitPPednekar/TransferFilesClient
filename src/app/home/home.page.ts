import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketEmitFileService } from '../socket-emit-file.service';
import { saveAs } from 'file-saver'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public socket: Socket, public socketSharableEmit : SocketEmitFileService) {

      
   
   }

  selectedFile: File;
  fileList: File[] = [];
 // listOfFiles: any[] = [];
  connectionId :any;



  fileChangeEvent(file) {
   // debugger;

   this.socket.connect();

      this.socket.on('connect', function() {
        
      });


    for (var i = 0; i <= file.target.files.length - 1; i++) {
      var selectedFile = file.target.files[i];
      this.fileList.push(selectedFile);
      //this.listOfFiles.push(selectedFile.name)
  }


   // console.log("files[0] ==>"+this.fileList[0]);
    

    var fileReader = new FileReader(),
    slice = this.fileList[0].slice(0, 100000); 

   

    let fileDetailsShare = {
      name: this.fileList[0].name, 
      type: this.fileList[0].type, 
      size: this.fileList[0].size, 
      data: null,
      slice : 0,
      arraySize : 0 ,
      arrayCounterInit : 0,
      reWriteFile : false
  }

    fileReader.readAsArrayBuffer(slice); 
    fileReader.onload = (evt) => {
        console.log(" fileReader !!!!!!!")
        
        debugger;
        fileDetailsShare.data = fileReader.result; 
        //this.socketSharableEmit.fileChangeEvents(fileDetailsShare);
        this.socket.emit('set-name', fileDetailsShare); 
      //   this.socket.emit('set-name', {
      //     name: this.fileList[0].name, 
      //     type: this.fileList[0].type, 
      //     size: this.fileList[0].size, 
      //     data: fileReader.result,
      //     slice : 0 
      // }); 
    }





        this.socket.on('end upload', (endData) => { 
            //debugger;
            console.log("end upload !!!!!!!!!!!!!!!!!!!!!!")
            this.fileList.splice(0, 1);
            slice = null;
            sliceNew = null;
            fileDetailsShare = {
              name: null, 
              type: null, 
              size: 0, 
              data: null,
              slice : 0,
              arraySize : 0,
              arrayCounterInit : 0,
              reWriteFile : false
            };

            reRequestfileDetailsShare = {
              name: null, 
              type: null, 
              size: 0, 
              data: null,
              slice : 0,
              reWriteFile : true
            }
            this.socket.removeListener('request slice upload');
            this.socket.removeListener('end upload');
            this.socket.disconnect();
        });





        var sliceNew;
        var reRequestfileDetailsShare = {
          name: this.fileList[0].name, 
          type: this.fileList[0].type, 
          size: this.fileList[0].size, 
          data: null, 
          slice :  0,
          reWriteFile : true
        }
        
        
      this.socket.on('request slice upload', (data) => { 
        debugger;
         // console.log("request slice upload !!!!!!!!!!!!")
          var fileReaderNew = new FileReader();
         // console.log("file.target.files[0].size------------------>"+ data.currentSlice)

         
            var place = data.currentSlice * 100000; 
            sliceNew = this.fileList[0].slice(place, place + Math.min(100000, this.fileList[0].size - place)); 
         
  
            
         fileReaderNew.readAsArrayBuffer(sliceNew); 
         fileReaderNew.onload = (evt) => {

                  var arrayBufferNew = fileReaderNew.result; 
                  reRequestfileDetailsShare.data =  arrayBufferNew;
                  reRequestfileDetailsShare.slice =  data.currentSlice;
                  
                  var arrayBufferNew = fileReaderNew.result; 


                 // this.socketSharableEmit.fileChangeEvents(reRequestfileDetailsShare);
                 this.socket.emit('set-name', reRequestfileDetailsShare); 
                  // this.socket.emit('set-name', { 
                  //     name: this.fileList[0].name, 
                  //     type: this.fileList[0].type, 
                  //     size: this.fileList[0].size, 
                  //     data: arrayBufferNew, 
                  //     slice :  data.currentSlice,
                  
                  // }); 
              }
        });

    
    
  }


  


  
  async ngOnInit() {
    
 

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

