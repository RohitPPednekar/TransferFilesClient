import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketEmitFileService } from '../socket-emit-file.service';
import { DirectoryListsService } from '../directory-lists-service/directory-lists.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  constructor(public socket: Socket,
     public socketSharableEmit : SocketEmitFileService,
     public dirLists : DirectoryListsService
     ) {
 }

  selectedFile: File;
  fileList: File[] = [];
 // listOfFiles: any[] = [];
  connectionId :any;



  fileChangeEvent(file) {
   // debugger;
    this.socket.connect();
    this.socket.on('connect', function() {});

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
        this.socket.emit('set-name', fileDetailsShare); 
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
            this.socket.emit('set-name', reRequestfileDetailsShare); 
          
        }
    });
  }



  async ngOnInit() {
    
 
  }


  
  ionViewWillLeave() {
    this.socket.disconnect();
  }

  ngAfterViewInit() {
     // this.dirLists.getDirLists();
  }

}

