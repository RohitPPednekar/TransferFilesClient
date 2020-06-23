import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SideMenuModule } from '../side-menu/side-menu.module';
import { FilesExplorerPageModule } from '../files-explorer/files-explorer.module';


@Injectable({
  providedIn: SideMenuModule
})
export class DirectoryListsService {

  constructor(private fileTransfer: FileTransfer,
    private file: File,
    private androidPermissions: AndroidPermissions) { }

    fileHeader:any = [
      {
        name:"document",
        label :"Document",
        icon : "home"
      },
      {
        name:"audio",
        label :"Audio",
        icon : "home"
      },
      {
        name:"video",
        label :"Video",
        icon : "home"
      },
      {
        name:"photos",
        label :"Photos",
        icon : "home"
      },
      {
        name:"apps",
        label :"Apps",
        icon : "home"
      },
      ]

    _fileList :any= {
      audio : {
        audioFiles:[],
        thumbnail:""
      },
      video : {
        videoFiles:[],
        thumbnail:""
      },
      image : {
        imageFiles:[],
        thumbnail:""
      },
      document : {
        documentFiles:[],
        archieve: [],
        thumbnail:""
      },
      app : {
        appFiles:[],
        thumbnail:""
      },
    //   {
    //   name: "name",
    //   path: "path",
    //   size: "1kb"
    // }
  };


  getDirLists(){
    
      //the first parameter file.externalRootDirectory is for listing all files on application's root directory
      //The second parameter is the name of the folder. You can specify the nested folder here. e.g. 'Music/Coldplay'
      this.file.listDir(this.file.externalRootDirectory, '').then((result) => {
        for(let item of result)
        {
          if(item.isDirectory == true && item.name != '.' && item.name!= '..')
          {
            this.getFileList(item.name);//Get all the files inside the folder. recursion will probably be useful here.
          }
          else if (item.isFile == true)
          { 
          
            let size;
            item.getMetadata(function (metadata) {
              size=metadata.size;
            });  

            //File found
            var fileExt =  item.name.substr(item.name.lastIndexOf('/') + 1).toString().toLowerCase();
            if( fileExt == "mp3" || fileExt == "3gp" || fileExt == "wav" || fileExt == "ogg" || fileExt == "gsm" || fileExt ==  "flac"){
                  this._fileList.audio.audioFiles.push({
                    name: item.name,
                    path: item.fullPath,
                    size: size
                  });   
            }else if(  fileExt == "mp4" || fileExt == "mkv" || fileExt == "webm" ) {
                  this._fileList.video.videoFiles.push({
                    name: item.name,
                    path: item.fullPath,
                    size: size
                  });
            }else if(  fileExt == "bmp" || fileExt == "gif" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "png" || fileExt == "webp" || fileExt == "heic" || fileExt == "heif" ) {
              this._fileList.image.imageFiles.push({
                name: item.name,
                path: item.fullPath,
                size: size
              });
            }else if(  fileExt == "doc" || fileExt == "docx" || fileExt == "html" || fileExt == "htm" || fileExt == "odt" || fileExt == "pdf" || fileExt == "xls" || fileExt == "xlsx" || fileExt == "ods" || fileExt == "ppt" || fileExt == "pptx" || fileExt == "txt" || fileExt == "csv" || fileExt == "wps" || fileExt == "xhtml" || fileExt == "json" || fileExt == "xml" ) {
              this._fileList.document.documentFiles.push({
                name: item.name,
                path: item.fullPath,
                size: size,
                thumbnail :""
              });
            }else if(  fileExt == "zip" ) {
              this._fileList.document.archieve.push({
                name: item.name,
                path: item.fullPath,
                size: size,
                thumbnail :""
              });
            }else if(  fileExt == "apk" ) {
              this._fileList.app.appFiles.push({
                name: item.name,
                path: item.fullPath,
                size: size,
                thumbnail :""
              });
            }
           
          }
        }

        return this._fileList
        

      },
      (error) => {
        console.log(error);
      });      
        
  }

  public getFileList(path: string): any
  {
    let file = new File();
    console.log("file.externalRootDirectory-->"+file.externalRootDirectory)
    this.file.listDir(file.externalRootDirectory, path)
    .then((result)=>{
      for(let item of result)
      {
        if(item.isDirectory == true && item.name != '.' && item.name != '..')
        {
          this.getFileList(path + '/' + item.name);
        }
        else
        {
          this._fileList.push({
            name: item.name,
            path: item.fullPath
          })
        }
      }
    },(error)=>{
      console.log(error);
    })
  }


  async downloadFile() {
    //TODO
  }
  
  getPermission() {
    this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.downloadFile();
        } 
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if(status.hasPermission) {
                this.downloadFile();
              }
            });
        }
      });
  }
}
