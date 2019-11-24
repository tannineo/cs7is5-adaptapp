import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})
export class HomepageComponent implements OnInit {
  faHeart = faHeart;
  faSearch = faSearch;
  faLogOut = faSignOutAlt;
  userName = '';
  config = {
    'force_pic_config': '',
    'network_status': ''
  };
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
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit() {
    this.logNetworkInfo();
    this.userName = localStorage.getItem('userName');
  }
  logNetworkInfo() {
    return navigator['connection'].effectiveType;
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
    this.userService.logoutUser()
      .subscribe((data: any) => {
        if (data.msg === 'OK') {
          localStorage.clear();
          this.router.navigate(['/']);
        } else {
          console.log('Logout not successful');
        }
      });
  }
  onResolutionCheckChange(e) {
    if (event.target['checked']) {
      this.config.force_pic_config = 'true';
      this.config.network_status = this.logNetworkInfo();
      this.userService.updateConfig(this.config)
        .subscribe((data: any) => {
          if (data.msg === 'OK') {
            this.router.navigate(['/home']);
          } else {
            console.log('setting config not successful');
          }
        });
    }
  }
}
