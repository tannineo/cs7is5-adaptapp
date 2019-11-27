import {Component, OnInit, Input, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {NgMasonryGridComponent} from 'ng-masonry-grid';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})
export class HomepageComponent implements OnInit {
  @Input() details = {
    searchValue: '',
  };
  faHeart = faHeart;
  faSearch = faSearch;
  faLogOut = faSignOutAlt;
  faUserCog = faUserCog;
  userName = '';
  config = {
    'force_pic_config': false,
    'network_status': ''
  };
  networkInfo = '';
  imageSize = 200;
  imagesList = [];
  recommendedList = [];
  NetworkMsg = '';
  isHighRes = false;
  forceConfig = false;
  settingsClicked = false;
  @ViewChild('images') imagesElement: NgMasonryGridComponent;
  constructor(private router: Router, private userService: UserService, private http: HttpClient) {
  }
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.logNetworkInfo();
    this.getUserConfig();
  }
  getUserConfig() {
    if (!localStorage.getItem('force_pic_config')) {
      this.userService.getConfig()
        .subscribe((data: any) => {
          if (data.msg === 'OK') {
            this.config.force_pic_config = data.result.force_pic_config;
            localStorage.setItem('force_pic_config', this.config.force_pic_config.toString());
            this.config.network_status = this.networkInfo;
            this.forceConfig = (localStorage.getItem('force_pic_config')) ? JSON.parse(localStorage.getItem('force_pic_config')) : false;
            this.setNetworkMsg(this.networkInfo);
            this.onHomePageLoad();
          } else {
            console.log('getting config not successful');
          }
        });
    } else {
      this.forceConfig = (localStorage.getItem('force_pic_config')) ? JSON.parse(localStorage.getItem('force_pic_config')) : false;
      this.setNetworkMsg(this.networkInfo);
      this.onHomePageLoad();
    }
  }
  logNetworkInfo() {
    this.networkInfo = navigator['connection'].effectiveType;
  }
  setNetworkMsg(network) {
    if (network === '4g' || this.forceConfig) {
      this.NetworkMsg = 'High Resolution Content';
      this.isHighRes = true;
      this.imageSize = 400;
    } else {
      this.NetworkMsg = 'Low Resolution Content';
      this.isHighRes = false;
      this.imageSize = 200;
    }
  }
  removeItem(e) {
  }
  heartClicked(e, img, i) {
    console.log(img);
    console.log(i);
    this.userService.likeImages(img.id)
      .subscribe((data: any) => {
        if (data.msg === 'OK') {
          img.likes = img.likes + 1;
          console.log('liked');
        } else {
          console.log('Search not successful');
        }
      });
  }
  onHomePageLoad() {
    this.userService.getSearchedImages()
      .subscribe((data: any) => {
        if (data.msg === 'OK') {
          let i = 0;
          if (this.imagesList.length === 0) {
            while (i < data.result.pictures.length) {
              this.imagesList.push({});
              i++;
            }
          }
          let j = 0;
          // this.imagesList = [];
          while (j < data.result.pictures.length) {
            // this.imagesList.push({});
            this.imagesList[j]['id'] = data.result.pictures[j].id;
            this.imagesList[j]['url'] = data.result.prefix + this.imageSize + data.result.pictures[j].url;
            this.imagesList[j]['likes'] = data.result.pictures[j].likes;
            j++;
          }
        } else {
          console.log('Search not successful');
        }
      });
  }
  loadRecommendedImages() {
    this.userService.getRecommendedImages()
      .subscribe((data: any) => {
        if (data.msg === 'OK') {
          const images = [];
          let i = 0;
          if (this.recommendedList.length === 0) {
            while (i < data.result.pictures.length) {
              this.recommendedList.push({});
              i++;
            }
          }
          let j = 0;
          while (j < data.result.pictures.length) {
            this.recommendedList[j]['id'] = data.result.pictures[j].id;
            this.recommendedList[j]['url'] = data.result.prefix + this.imageSize + data.result.pictures[j].url;
            this.recommendedList[j]['likes'] = data.result.pictures[j].likes;
            j++;
          }
          this.imagesElement.initializeMasonry();
        } else {
          console.log('Recommendation not successful');
        }
      });
  }
  searchClicked(e) {
    if (this.details.searchValue !== '') {
      this.userService.getSearchedImages(this.details.searchValue)
        .subscribe((data: any) => {
          if (data.msg === 'OK') {
            let i = 0;
            this.imagesList = [];
            while (i < data.result.pictures.length) {
              this.imagesList.push({});
              this.imagesList[i]['id'] = data.result.pictures[i].id;
              this.imagesList[i]['url'] = data.result.prefix + this.imageSize + data.result.pictures[i].url;
              this.imagesList[i]['likes'] = data.result.pictures[i].likes;
              i++;
            }
            this.loadRecommendedImages();
          } else {
            console.log('Search not successful');
          }
        });
    } else {
      console.log('Enter search value');
    }
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
      this.imageSize = 400;
      const forcedCheck = event.target['checked'] ? true : false;
    localStorage.setItem('force_pic_config', forcedCheck.toString());
      const newConfig  = {
        'force_pic_config': forcedCheck,
        'network_status': this.networkInfo
      };
      this.userService.updateConfig(newConfig)
        .subscribe((data: any) => {
          if (data.msg === 'OK') {
            this.forceConfig = forcedCheck;
          } else {
            console.log('setting config not successful');
          }
        });
    window.location.reload();
  }
  settingsIconClicked(e) {
    this.settingsClicked = !this.settingsClicked;
  }
}
