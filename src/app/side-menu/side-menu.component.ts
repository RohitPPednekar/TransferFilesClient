import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  selectedPath = '';
  constructor(private router: Router) { 
    this.router.events.subscribe((event:RouterEvent)=>{
      if(event && event.url){
        this.selectedPath = event.url;
      }
    })
    console.log("INSIDE SIDEMENUCOMPONENT !!!!!!!!!!!!!!!")
  }

  public appPages = [
    {
      title: 'Home',
      url: '/auth/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/auth/list',
      icon: 'list'
    }
  ];



  private _opened: boolean = false;
 
  _toggleSidebar() {
    console.log("Toggle !")
    this._opened = !this._opened;
  }

  ngOnInit() {}


 
}


