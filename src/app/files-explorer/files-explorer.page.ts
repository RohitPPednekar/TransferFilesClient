import { Component, OnInit } from '@angular/core';
import { DirectoryListsService } from '../directory-lists-service/directory-lists.service';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-files-explorer',
  templateUrl: './files-explorer.page.html',
  styleUrls: ['./files-explorer.page.scss'],
})
export class FilesExplorerPage implements OnInit {
  DirList:any = [];
  constructor(public dirLists : DirectoryListsService,
    private file: File
    ) { 
      
    }

  ngOnInit() {
   // this.DirList = this.dirLists.getDirLists();
   this.getDirLists();
    
  }

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
          })  
          //File found
          this.DirList.push({
            name: item.name,
            path: item.fullPath,
            size: size
          });
        }
      }

      
      

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

        let size;
            item.getMetadata(function (metadata) {
              size=metadata.size;
            });
        this.DirList.push({
          name: item.name,
          path: item.fullPath,
          size: size
        })
      }
    }
  },(error)=>{
    console.log(error);
  })
}


}
