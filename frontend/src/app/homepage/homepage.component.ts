import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})
export class HomepageComponent implements OnInit {
  faHeart = faHeart;
  faSearch = faSearch;
  faLogOut = faSignOutAlt
  networkInformation;
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
  recommendedList = [{
    url: 'https://source.unsplash.com/user/erondu/1000x700'
  },
    {
      url: 'https://source.unsplash.com/user/erondu/1000x700'
    }];
  constructor() {
  }
  ngOnInit() {
    this.logNetworkInfo();
  }
  logNetworkInfo() {
    this.networkInformation = navigator['connection'].effectiveType;
  }
  removeItem(e) {
  }
  heartClicked(e, img, i) {
    console.log(img);
    console.log(i);
  }
  searchClicked(e) {
  }
  logOutClicked(e) {
  }
}
