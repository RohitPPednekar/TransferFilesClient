import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { saveAs } from 'file-saver'
import * as JSZip from 'jszip'
import * as JSZipUtils from 'jszip-utils'



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public socket: Socket) { }


   compressed_img(urls,nombre) {
    var zip = new JSZip();
    var count = 0;
    var name = nombre+".zip";

    return new Promise((resolve,reject)=>{
            urls.forEach(function(url){
              console.log("-------1--------")
              JSZipUtils.getBinaryContent(url, function (err, data) {
                console.log("-------2--------"+data)
                if(err) {
                  console.log("-------3--------")
                  throw err; 
                }
                console.log("-------4--------")
                zip.file(url, data,  {binary:true});
                count++;
                if (count == urls.length) {
                  zip.generateAsync({type:'blob'}).then(function(content) {
                    
                    resolve(content);
                      //saveAs(content, name);
                  });
                }
                });
            });

          });
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
      "../../assets/Battleship.2012.BluRay.1080p.x264.YIFY.mp4", 
      "../../assets/DSC_0023.JPG"];
    var nombre = "Zip_img";

    var value = await this.compressed_img(urls,nombre);
      console.log("value------->"+value)

   // await gzipper.compress();

    let name = `user-${new Date().getTime()}`;
    
    
    this.socket.emit('set-name',value);
 
    this.socket.fromEvent('users-changed').subscribe(data => {
      console.log("From SERVER ====>"+data)
      
    });
 
    this.socket.fromEvent('message').subscribe(message => {
      
    });
  }


  
  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
