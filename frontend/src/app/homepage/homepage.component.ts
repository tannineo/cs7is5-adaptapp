import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})
export class HomepageComponent implements OnInit {

  imagesList = [{
    url: 'https://source.unsplash.com/user/erondu/1600x900'
  },
    {
      url: 'https://source.unsplash.com/user/erondu/1600x900'
    },
    {
      url: 'https://source.unsplash.com/user/erondu/600x900'
    },
    {
      url: 'https://source.unsplash.com/user/erondu/600x900'
    },
    {
      url: 'https://source.unsplash.com/user/erondu/600x900'
    }];
  constructor() {
  }

  ngOnInit() {
  }

  removeItem(e) {
  }
}
